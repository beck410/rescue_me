;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('shelterFactory',function($http,FIREBASE_URL){

    function getShelterDogs(mainCB){
      var url = FIREBASE_URL + 'shelterDogs/.json';
      $http.get(url)
        .success(function(data){
          var dataToArray = _objectToArray(data);
          _addShelterContactDetails(dataToArray, mainCB,
            function(orgs,dogs,mainCB){
              mainCB(dogs,orgs);
            });
        })
        .error(function(err){
          console.log('get shelterDogs error:' + err);
       });
    }

    function _objectToArray(data){
      var dataArray = [];
      for(var key in data){
        dataArray.push(data[key]);
      }
      return dataArray;
    }

    function _addShelterContactDetails(dogs, mainCB, configureCB){
      var url = FIREBASE_URL + 'shelterOrgs/.json';
      $http.get(url)
      .success(function(data){
        configureCB(data, dogs, mainCB);
      })
      .error(function(err){
        console.log('get shelterOrgs error: ' + err);
      });
    }

    return {
      getShelterDogs: getShelterDogs,
    };
  });
})();
