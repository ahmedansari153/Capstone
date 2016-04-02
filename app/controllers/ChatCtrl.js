"use strict";

Business.controller("ChatCtrl", [
  "$scope",
  "$location",
  "businessFactory",
  "$http", 

  function ($scope, $location, businessFactory, $http) {

    $scope.messageData = []

  	let messageRef = new Firebase('https://capstoneaa.firebaseio.com');
  	let messageField = $("#messageInput");
  	let nameField = $('#nameInput');
    // let messageList = $('#messages');
      
    $scope.submit = function() {
      console.log("fired");
      let username = nameField.val();
      let message = messageField.val();
      messageRef.push({name:username, text:message});
      messageField.val('');
      $scope.messageData = [];
      $scope.get();
    }
    $scope.delete = function(id) {
      console.log("id", id);
      let ref = messageRef+id+".json/";
      $http.delete(ref)
      .success(function(){
        location.reload(true);
      })
    };
    $scope.get = function() { businessFactory().then(
      // Handle resolve() from the promise
      businessCollection => {
        Object.keys(businessCollection).forEach(key => {
          businessCollection[key].id = key;
          $scope.messageData.push(businessCollection[key]);
        });
      },
      // Handle reject() from the promise
      err => console.log(err)
    );
  };  
  $scope.get();
}
]);