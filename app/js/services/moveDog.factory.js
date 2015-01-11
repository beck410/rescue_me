;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('moveDogFactory',function(requestURL,FIREBASE_URL,$http){

    function addDogToList(newDogDB,oldDogDB,dogID,dog,cb){
      _postDog(newDogDB,dog,cb);
      _deleteDog(oldDogDB,dogID,dog);
    }

    function _postDog(newDogDB,dog,cb){
      var url = requestURL.url(newDogDB);
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
      var url = requestURL.url(oldDogDB,dogID);
      $http.delete(url)
      .success(function(){
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
