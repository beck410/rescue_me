  ;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('shelterFactory',function($http,FIREBASE_URL){

      function addToPotentialList(shelterID,dog,cb){
      _postDog(dog,cb);
      _deleteDog(shelterID);
    }

    //PRIVATE FUNCTIONS

    function _deleteDog(shelterID){
      var url = FIREBASE_URL + 'shelterDogs/' + shelterID + '.json';
      $http.delete(url)
      .success(function(){
      })
      .error(function(err){
        console.log('delete dog error: ' + err);
      });
    }

    function _postDog(dog,cb){
      console.log(dog);
      var url = FIREBASE_URL + 'potentialDogs.json';
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
      addToPotentialList: addToPotentialList
    };
  });
})();
