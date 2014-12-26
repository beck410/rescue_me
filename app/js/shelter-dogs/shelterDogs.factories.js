  ;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('shelterFactory',function($rootScope, $http,FIREBASE_URL){

    function getShelterDogs(mainCB){
      var url = FIREBASE_URL + 'shelterDogs/.json';
      $http.get(url)
        .success(function(data){
          var dataToArray = _objectToArray(data);
          _addShelterContactDetails(dataToArray, mainCB,
            function(orgs,dogs,mainCB){
              var configuredData = _addShelterContactInfo(dogs,orgs);
              $rootScope.shelterDogs = configuredData;
              mainCB(configuredData);
            });
        })
        .error(function(err){
          console.log('get shelterDogs error:' + err);
       });
    }


    function getShelterDogDetails(id, cb){
      var dog = $rootScope.shelterDogs[id];
      cb(dog);
    }

    function addToPotentialList(id,cb){
      // _postDog();
      // _deleteDog();
      cb();
    }

    //PRIVATE FUNCTIONS

    function _deleteDog(url,cb){
      $http.delete(url)
      .success(function(){
        if(cb){
          cb();
        }
          console.log('dog deleted');
      })
      .error(function(err){
        console.log('delete dog error: ' + err);
      });
    }

    function _postDog(url,cb,dog){
      $http.post(url,dog)
        .success(function(){
          if(cb){
            cb();
          }
          console.log('post dog to potential db');
        })
        .error(function(err){
          console.log('post dog error: ' + err);
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
        var dataToArray = _objectToArray(data);
        configureCB(dataToArray, dogs, mainCB);
      })
      .error(function(err){
        console.log('get shelterOrgs error: ' + err);
      });
    }

    return {
      getShelterDogs: getShelterDogs,
      getShelterDogDetails: getShelterDogDetails,
      addToPotentialList: addToPotentialList
    };
  });
})();
