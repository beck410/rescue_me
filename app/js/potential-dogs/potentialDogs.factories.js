;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('potentialFactory',function(FIREBASE_URL, $http){

    function addToRescueList(potentialID,dog,cb){
      _postDog(dog,cb);
      _deleteDog(potentialID);
    }

    //PRIVATE FUNCTION

    function _deleteDog(potentialID){
      var url = FIREBASE_URL + 'potentialDogs/' + potentialID + '.json';
      $http.delete(url)
      .success(function(){
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
      addToRescueList: addToRescueList,
    };

  });
})();
