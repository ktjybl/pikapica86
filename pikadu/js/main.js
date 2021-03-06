﻿// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxe0cg1tHpy0MRjF7oz1HB9fxVqwBM490",
  authDomain: "picapika86-dfdb2.firebaseapp.com",
  databaseURL: "https://picapika86-dfdb2.firebaseio.com",
  projectId: "picapika86-dfdb2",
  storageBucket: "picapika86-dfdb2.appspot.com",
  messagingSenderId: "415314102454",
  appId: "1:415314102454:web:c2d58f906ac9b25e83be17"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Создаем переменную, в которую положим кнопку меню

let menuToggle = document.querySelector('#menu-toggle');

// Создаем переменную, в которую положим меню

let menu = document.querySelector('.sidebar');

// отслеживаем клик по кнопке меню и запускаем функцию
 const regExpValidEmail=/^\w+@\w+\.\w{2,}$/;
const loginElem=document.querySelector('.login'),
      loginForm=document.querySelector('.login-form'),
      emailInput=document.querySelector('.login-email'),
      passwordInput=document.querySelector('.login-password'),
      loginSignup=document.querySelector('.login-signup'),
      userElem=document.querySelector('.user'),
      exitElem=document.querySelector('.exit'),
      editElem=document.querySelector('.edit'),
      editContainer=document.querySelector('.edit-container'),
      editUsername=document.querySelector('.edit-username'),
      editPhotoURL=document.querySelector('.edit-photo'),
      userAvatarElem=document.querySelector('.user-avatar'),
      postsWrapper=document.querySelector('.posts'),
      buttonNewPost=document.querySelector('.button-new-post'),
      addPostElem=document.querySelector('.add-post'),
      loginForget=document.querySelector('.login-forget'),
      userNameElem=document.querySelector('.user-name');
const DEFAULT_PHOTO=userAvatarElem.src;      
const setUsers={
user:null,
initUser(handler){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      this.user=user;
    } else{
       this.user=null;
    }
    if(handler)handler();
  })
},
logIn(email, password, handler){
  if(!regExpValidEmail.test(email)){
    alert(' email не валиден');
     return;
     }
firebase.auth().signInWithEmailAndPassword(email, password)
.catch(err=>{
  const errCode=err.code;
    const errMessage=err.message;
    if(errCode==='auth/wrong-password'){
      alert('Неверный пароль')
    } else if(errCode==='user-not-found') {
      alert('Пользователь не найден')
    } else {
      alert(errMessage)
    }
});
//const user=this.getUser(email);
//if(user&&user.password===password){
//this.authorizedUser(user);
//handler();
//}  else{
//alert('Пользователь с такими данными не найден')
//}
},
logOut(){
firebase.auth().signOut();
},
signUp (email, password, handler) {
  if(!regExpValidEmail.test(email)){
    alert(' email не валиден')
     return;
     }
  if(!email.trim() || !password.trim()){
    alert('введите данные')
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(data=>{
     this.editUser(email.substring(0,email.indexOf('@'),null, handler)
  })
  .catch(err=>{
    const errCode=err.code;
    const errMessage=err.message;
    if(errCode==='auth/weak-password'){
      alert('слабый пароль')
    } else if(errCode==='email-already-in-use') {
      alert('Пользователь с таким email уже зарегистрирован')
    } else {
      alert(errMessage)
    }
  });
  //if(!this.getUser(email)){
  // const user={email, password, displayName:email.substring(0,email.indexOf('@'))};
  //  listUsers.push(user)
  //  this.authorizedUser(user);
  //  handler();
  //}else{
  //   
  //}
},
editUser(displayName, photoURL, handler){
  const user=firebase.auth().currentUser;
  
  if(userName){
    if(userPhoto){
    user.updateProfile({
      displayName,
      photoURL
    }).then(hendler)
  }else{
    user.updateProfile({
    displayName
  }).then(hendler)
  }
  
  }
},
//getUser(email){
//return listUsers.find(item=> item.email===email)
//},
//authorizedUser(user){
//this.user=user;
//}
sendForget(email){
firebase.auth().sendPasswordResetEmail(email)
.then(()=>{
alert('Письмо отправлено')
})
.catch(err=>{
console.log(err);
})
}
};
const setPosts={
  allPosts:[],
addPost(title, text, tags, handler){
const user=firebase.auth().currentUser;
  this.allPosts.unshift({
    id:`postID${((+new Date()).toString(16))}-${user.uid}`,
    title,
    text,
    tags:tags.split('.').map(item=>item.trim()),
    author:{
      displayName:setUsers.user.displayName,
      photo:setUsers.user.photoURL,
    },
    date: new Date.toLocalString(),
    like:0,
    comments:0,
  })
  firebase.database().ref('post').set(this.allPosts)
   .then(()=>this.getPosts(handler))
   
},
getPosts(handler){
firebase.database().ref('post').on('value', snapshot=>{
    this.allPosts=snapshot.val()||[];
    handler();
})
}
};
const toggleAuthDom=()=>{
const user=setUsers.user;
if(user){
loginElem.style.display='none';
userElem.style.display='';
userNameElem.textContent=user.displayName;
userAvatarElem.src=user.photoURL||DEFAULT_PHOTO;
buttonNewPost.classList.add('visible');
}else{
loginElem.style.display='';
userElem.style.display='none';
buttonNewPost.classList.remove('visible');
addPostElem.classList.remove('visible');
postsWrapper.classList.add('visible');
}
};
const showAddPost=()=>{
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}
const showAllPosts=()=>{
  let postsHTML='';
  setPosts.allPosts.forEach(( { title, text, date, tags, like, comments, author } )=>{
    postsHTML += `
    <section class="post">
     <div class="post-body">
     <h2 class="post-title">${title}</h2>
    <p class="post-text">${text}</p>
    <div class="tags">
  ${tags.map(tag=>` <a href="#${tag}" class="tag">#${tag}</a>`)}
    </div>
      </div>
     <div class="post-footer">
    <div class="post-buttons">
         <button class="post-button likes">
            <svg width="19" height="20" class="icon icon-like">
         <use xlink:href="img/icons.svg#like"></use>
           </svg>
            <span class="likes-counter">${like}</span>
         </button>
    <button class="post-button comments">
      <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
    </svg>
            <span class="comments-counter">${comments}</span>
  </button>
      <button class="post-button save">
         <svg width="19" height="19" class="icon icon-save">
          <use xlink:href="img/icons.svg#save"></use>
        </svg>
      </button>
      <button class="post-button share">
           <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
           </svg>
      </button>
    </div>
    <div class="post-author">
      <div class="author-about">
          <a href="#" class="author-username">${author.displayName}</a>
          <span class="post-time">${date}</span>
      </div>
        <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
       </div>
      </div>
  </section>
    `;
  })
  postsWrapper.innerHTML=postsHTML;
  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
}
const init=()=>{
loginForm.addEventListener('submit', (event)=>{
  event.preventDefault();
 const emailValue=emailInput.value;
 const passwordValue=passwordInput.value;
  setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
  loginForm.reset();
});
loginSignup.addEventListener('click', (event)=>{
  event.preventDefault();
  const emailValue=emailInput.value;
 const passwordValue=passwordInput.value;
  setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
  loginForm.reset(); 
});
exitElem.addEventListener('click',event=>{
  event.preventDefault();
  setUsers.logOut(toggleAuthDom);

});
editElem.addEventListener('click', event=>{
  event.preventDefault();
  editContainer.classList.toggle('.visible');
  editUsername.value=setUsers.user.displayName;
});
editContainer.addEventListener('submit', event=>{
  event.preventDefault();
  setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom)
  editContainer.classList.remove('.visible');
});
menuToggle.addEventListener('click', function (event) {
  
// отменяем стандартное поведение ссылки

  event.preventDefault();
  
// вешаем класс на меню, когда кликнули по кнопке меню 
  
menu.classList.toggle('visible');
}) 
buttonNewPost.addEventListener('click', event=>{
  event.preventDefault();
  showAddPost();
})
loginForget.addEventListener('click', event=>{
  event.preventDefault();
  setUsers.sendForget(emailInput.value);
emailInput.value='';
})
addPostElem.addEventListener('submit', event=>{
  event.preventDefault();
  const { title, text, tags }=addPostElem.elements;
  if(title.value.length<6){
    alert('Слишком короткий заголовок');
    return;
  }
  if(text.value.length<50){
    alert('Слишком короткий пост');
    return;
  }
  setPosts.addPost(title.value, text.value, tags.value, showAddPost);
  addPostElem.classList.remove('visible');
  addPostElem.reset();
});
  setUsers.initUser(toggleAuthDom);
  setPosts.getPosts(showAllPosts),
}
document.addEventListener('DOMContentLoaded',init)