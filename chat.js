ifUserIsLoggedIn(function(){
  updateUserData();

  loadUsers(function(users){
    var usersList = "";
    for(var uid in users){
      var user = users[uid];

      /* if user id over id then not add in user list */
      if( window.currentUser.id != uid ){
        usersList += renderUser(user);
      }
    }

    /* adding run time elemets in web page */
    getElement("members").innerHTML = usersList;
  });
});

function getChatId(id1, id2) {
  if(id1 > id2){
    return id1 + "" + id2;
  }
  return id2 +"" + id1;
}
