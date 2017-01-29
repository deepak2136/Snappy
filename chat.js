ifUserIsLoggedIn(function(){
  updateUserData();

  loadUsers(function(users){
    var usersList = "";
    for(var uid in users){
      var user = users[uid];
      if( window.currentUser.id != uid ){
        usersList += renderUser(user);
      }      
    }

    /* adding run time elemets in web page */
    getElement("members").innerHTML = usersList;
  });
});
