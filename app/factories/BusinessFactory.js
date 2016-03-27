"use strict";

Business.factory("businessFactory", function ($q, $http, $location) {
  return function () {
    return $q(function (resolve, reject) {
      return $http.get("https://capstoneaa.firebaseio.com/.json").success(function (businessObject) {
      	console.log("businessObject", businessObject);
        return resolve(businessObject);
      }, function (error) {
        return reject(error);
      });
    });
  };
});