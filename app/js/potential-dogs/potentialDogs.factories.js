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

    function getDogDetails(dog,cb){
      var url = FIREBASE_URL + 'potentialDogs/' + dog + '.json';
      $http.get(url)
      .success(function(details){
        cb(details);
      })
      .error(function(err){
        console.log('potential dog details error: ' + err);
      });
    }

    function addToRescueList(potentialID,dog,cb){
      _postDog(dog,cb);
      _deleteDog(potentialID);
    }

    //PRIVATE FUNCTION

    function _deleteDog(potentialID){
      var url = FIREBASE_URL + 'potentialDogs/' + potentialID + '.json';
      $http.delete(url)
      .success(function(){
        console.log('removed dog from fb potentialDogs')
      })
      .error(function(err){
        console.log('delete dog error: ' + err);
      });
    }

    function _postDog(dog,cb){
      console.log(dog);
      var url = FIREBASE_URL + 'rescueDogs.json'; 
      $http.post(url,dog)
        .success(function(){
          if(cb){
            cb();
          }
          console.log('post dog to rescue db');
        })
        .error(function(err){
          console.log('post dog error: ' + err);
        });
    }

    return {
      getPotentialDogs: getPotentialDogs,
      getDogDetails: getDogDetails,
      addToRescueList: addToRescueList,
    };

  });
})();
