;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('moveDogFactory',function(requestURL,FIREBASE_URL,$http){

    function addDogToList(newDogDB,rescueName,oldDogDB,dogID,dog,cb){
      _postDog(newDogDB,rescueName,dog,cb);
      _deleteDog(oldDogDB,rescueName,dogID);
    }

    function _postDog(newDogDB,rescueName,dog,cb){
      var url = requestURL.url(newDogDB,rescueName);
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

    function _deleteDog(oldDogDB,rescueName,dogID){
      var url = requestURL.url(oldDogDB,rescueName,dogID);
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
