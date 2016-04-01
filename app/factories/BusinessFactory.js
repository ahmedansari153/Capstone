"use strict";

Business.factory("businessFactory", ($q, $http) =>
  () =>
    $q((resolve, reject) => 
      $http
        .get("https://capstoneaa.firebaseio.com/.json")
        .success(
          businessObject => resolve(businessObject),
          error => reject(error)
        )
    )
);
