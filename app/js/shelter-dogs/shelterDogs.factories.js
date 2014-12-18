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

    function objectToArray(data){
      var dataArray = [];
      for(var key in data){
        dataArray.push(data[key]);
      }
      return dataArray;
    }


    return {
      getShelterDogs: getShelterDogs,
      objectToArray: objectToArray
    };
  });
})();
