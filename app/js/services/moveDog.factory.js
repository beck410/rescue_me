;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('moveDogFactory',function(FIREBASE_URL,$http){

    function addDogToList(newDogDB,oldDogDB,dogID,dog,cb){
      _postDog(newDogDB,dog,cb);
      _deleteDog(oldDogDB,dogID,dog,cb);
    }

    function _postDog(newDogDB,dog,cb){
      var url = FIREBASE_URL + newDogDB + '.json';
      $http.post(url,dog)
        .success(function(dog){
          if(cb){
            cb(dog);
          }
        })
        .error(function(err){
          console.log('post dog error: ' + err);
        });
    }

    function _deleteDog(oldDogDB,dogID,dog,cb){
      var url = FIREBASE_URL + oldDogDB  + '/' + dogID + '.json';
      $http.delete(url)
      .success(function(){
        cb(dog);
      })
      .error(function(err){
        console.log('delete dog error: ' + err);
      });
    }

    return {
      addDogToList: addDogToList
    };
  });
})();
