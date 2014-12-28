;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('potentialFactory',function(FIREBASE_URL, $http){
    function getPotentialDogs(cb){
      var url = FIREBASE_URL + 'potentialDogs.json';
      $http.get(url)
      .success(function(dogs){
        console.log('potential dogs pulled from fb');
        cb(dogs);
      })
      .error(function(err){
        console.log('potential dogs list error: ' + err);
      });
    }

    return {
      getPotentialDogs: getPotentialDogs
    };

  });
})();
