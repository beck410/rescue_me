;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('dogDetailsFactory',function($http, FIREBASE_URL){

    function getDogDetails(dogDB,id,cb){
      var url = FIREBASE_URL + dogDB + '/' + id +'.json';
      $http.get(url,{cache:true})
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
