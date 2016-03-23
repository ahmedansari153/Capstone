"use strict"

BusinessApp.factory("Business", ($q, $http) =>
  () =>
    $q((resolve, reject) => 
      $http
        .get("https://capstoneaa.firebaseio.com/capstoneaa.json")
        .success(
          businessObject => resolve(businessObject),
          error => reject(error)
        )
    )
);