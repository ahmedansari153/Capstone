"use strict";

Business.controller("ChatCtrl", [
  "$scope",
  "$location",
  "businessFactory",

  function ($scope, $location, businessFactory) {

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
      businessFactory().then(
        businessCollection => {
          Object.keys(businessCollection).forEach(key => {
            businessCollection[key].id = key;
            $scope.messageData.push(businessCollection[key]);
            console.log("businessCollection",businessCollection);
        });
      },
      // Handle reject() from the promise
      err => console.log(err)
      )
    }
    businessFactory().then(
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
  }  
]);