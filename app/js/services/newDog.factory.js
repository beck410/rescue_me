;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('addNewDogFactory',function(requestURL,$http,FIREBASE_URL){
    function addDog(dog,rescueName,dogDB,cb){
      var url = requestURL.url(dogDB,rescueName);
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
