"use strict";

Business.controller("ChatCtrl", [
  "$scope",
  "$location",
  "businessFactory",
  "$http",
  "$anchorScroll",

  function ($scope, $location, businessFactory, $http, $anchorScroll) {
    //create an empty object to hold the message data//
    $scope.messageData = []
    $(".button-collapse").sideNav();
    let $target = $('html,body'); 
    $target.animate({scrollTop: $target.height()}, 1000);
  	let messageRef = new Firebase('https://capstoneaa.firebaseio.com');
  	let messageField = $("#messageInput");
  	let nameField = $('#nameInput');
    // let messageList = $('#messages');
    $(document).ready(function(){
    $("html,footer").scrollTop(.1);
});

    $scope.submit = function() {
      console.log("fired");
      let username = nameField.val();
      let message = messageField.val();
      messageRef.push({name:username, text:message});
      //clear the messagefield to ready for the next message//
      messageField.val('');
      //clear messageData contents for when the updated data comes in//
      $scope.messageData = [];
      //get the updated messageData//
      $scope.get();
    }
    //when ng-click="submit()"" push data from those fields to firebase.//

    $scope.edit = function(id) {
      console.log("id", id);
      let editField = $("#editInput"+id).val();
      let ref = messageRef+id+".json/";
      console.log("editField", editField);

      $http.patch(ref, {text: editField})
        .success(function(){
         //after edit reload the page so that the new data appears.//
          location.reload(true);
          })
    };

    $scope.delete = function(id) {
      console.log("id", id);
      //create url of message that needs deleting//
      let ref = messageRef+id+".json/";
      //delete from firebase//
      $http.delete(ref)
      .success(function(){
        //after deletion reload the page so that the new data appears.//
        location.reload(true);
      })
    };


    //when ng-click="delete(text.id)"" delete the message with the id of the current message//

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
    //on load get the message data//
  };  
  $scope.get();
}
]);