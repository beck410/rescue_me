;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('dogDetailsFactory',function($http, FIREBASE_URL,requestURL){

    function getDogDetails(dogDB,id,cb){
      var url = requestURL.url(dogDB,id);
      $http.get(url)
      .success(function(dog){
        cb(dog);
      })
      .error(function(err){
        console.log('get shelter dog error: ' + err);
      });
    }
    return {
      getDogDetails: getDogDetails
    };
  });
})();
