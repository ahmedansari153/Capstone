"use strict";

MovieHistory.controller("ChatCtrl", [
  "$scope",
  "$location",
  "BusinessFactory",
  "FirebaseURL",

  function ($scope, $location, BusinessFactory, FirebaseURL) {
  	$scope.message=[];
  	$scope.text=""
  	$scope.submit = function() {
        if ($scope.text) {
          $scope.message.push(this.text);
          $scope.text = '';
    }
} 