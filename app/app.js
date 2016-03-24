"use strict";

/* exported Business */

let Business = angular.module("BusinessApp", ["ngRoute", "firebase"])
  .constant('firebaseURL', "https://capstoneaa.firebaseio.com");

/*
  Define a promise for any view that needs an authenticated user
  before it will resolve (see below)
 */

let isAuth = (authFactory) => new Promise((resolve, reject) => {
  if (authFactory.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

/*
  Set up routes for Business app
 */

Business.config(["$routeProvider",
  function ($routeProvider) {
    $routeProvider.
	    when("/", {
	        templateUrl: "partials/chat.html",
          controller: "ChatCtrl",
          resolve: { isAuth }
      }).
      when("/mission", {
          templateUrl: "partials/mission.html",
      }).
      when("/location", {
          templateUrl: "partials/location.html",
      }).
      when("/employee", {
          templateUrl: "partials/employee.html",
      }).
	    when("/login", {
        	templateUrl: "partials/login.html",
        	controller: "LoginCtrl"
      }).
	    when("/logout", {
	    	templateUrl: "partials/login.html",
	    	controller: "LoginCtrl"
	    }).
	    otherwise({
        redirectTo: "/"
     	});
  }]);
Business.run([
  "$location",

  ($location) => {
    let movieHistoryRef = new Firebase("https://capstoneaa.firebaseio.com");

    movieHistoryRef.onAuth(authData => {
      if (!authData) {
        $location.path("/login");
      }
    });
  }
]);

