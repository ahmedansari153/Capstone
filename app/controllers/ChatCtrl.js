"use strict";

Business.controller("ChatCtrl", [
  "$scope",
  "$location",


  function ($scope, $location) {
  	let messageRef = new Firebase('https://capstoneaa.firebaseio.com');
  	let messageField = $("#messageInput");
  	let nameField = $('#nameInput');
    let messageList = $('#messages');
    	
    messageField.keypress(function () {
    $scope.submit = function() {
    	let username = nameField.val();
      let message = messageField.val();

      messageRef.push({name:username, text:message});
      messageField.val('');
	  };
	 })
    messageRef.limitToLast(10).on('child_added', function (snapshot) {
    	let data = snapshot.val();
    	let username = data.name || "anonymous";
    	let message = data.text;

    	let messageElement = $("<li>");
    	let nameElement = $("<p class='username'></p>")
    	nameElement.text(username);
    	messageElement.text(message).prepend(nameElement);

    	messageList.append(messageElement)
  })
  }]);