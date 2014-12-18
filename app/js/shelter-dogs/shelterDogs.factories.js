;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('shelterFactory',function($http,FIREBASE_URL){

    function getShelterDogs(cb){
      var url = FIREBASE_URL + 'shelterDogs/.json';
      $http.get(url)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          console.log('get shelterDogs error:' + err);
       });
    }

    return {
      getShelterDogs: getShelterDogs
    };
  });
})();
