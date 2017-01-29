function click(elementId, fn){
  var element = document.getElementById(elementId);
  if( element ) {
    element.addEventListener("click", fn);
  }
}

function logInUser() {
  /* login with google with firebase realtime database */
  loginWithGoogle();
   //redirect("chat.html");
}

function redirect(path){
  window.location = path;
  return false;
}


function loginWithGoogle(){
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // The signed-in user info.
  var user = result.user;
  /* google login object containing all required data */
  console.log(user.uid + "\n" + user.displayName + "\n" + user.email);

  /* create user */
  createUser(user.uid, user.displayName, user.email);
  }).catch(function(error) {
    console.log(error.message);
  });
}

function createUser(uid, uname, uemail){
  var database = firebase.database(); /* adding realtime database on frebase.google.com */
  var userRef = database.ref("users"); /* refence to root object */

var user = {
  id: uid,
  name: uname,
  email: uemail
};

/* then means when task is complete it execute code */
  userRef.child(uid).set(user).then(function(){
    redirect("chat.html");
  });
}

function ifUserIsLoggedIn(fn){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.currentUser = {
        id: user.uid,
        name: user.displayName,
        email: user.email
      };

      fn();
    } else {
      // No user is signed in.

    }
  });
}

function getElement(id) {
  return document.getElementById(id)
}

function updateUserData(){
  var userNameElement = getElement("username");
  userNameElement.textContent = window.currentUser.name;
}
