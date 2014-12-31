;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('moveDogFactory',function(FIREBASE_URL,$http){

    function addToNextList(newDogDB,oldDogDB,dogID,dog,cb){
      _postDog(newDogDB,dog,cb);
      _deleteDog(oldDogDB,dogID);
    }

    function _postDog(newDogDB,dog,cb){
      var url = FIREBASE_URL + newDogDB + '.json';
      $http.post(url,dog)
        .success(function(){
          if(cb){
            cb();
          }
        })
        .error(function(err){
          console.log('post dog error: ' + err);
        });
    }

    function _deleteDog(oldDogDB,dogID){
      var url = FIREBASE_URL + oldDogDB  + '/' + dogID + '.json';
      console.log(url)
      $http.delete(url)
      .success(function(){
        console.log('deleted')
      })
      .error(function(err){
        console.log('delete dog error: ' + err);
      });
    }

    return {
      addToNextList: addToNextList
    };
  });
})();
