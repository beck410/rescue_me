;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('addNewDogFactory',function($http,FIREBASE_URL){
    function addDog(dog,dogDB,cb){
      console.log(dog);
      var url = FIREBASE_URL + dogDB + '.json'
      $http.post(url,dog)
      .success(function(dog){
        console.log('success')
        cb(dog);
      })
      .error(function(err){
        console.log('add new dog error: ' + err)
      })
    }

    return {
      addDog: addDog
    };
  });
})();
