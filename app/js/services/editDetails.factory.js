;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('editDogFactory',function(requestURL,FIREBASE_URL,$http){

    function editDog(dogDB,rescueName,id,dog,cb){
      _postDog(dogDB,rescueName,id,dog,cb);
    }

    function _postDog(newDogDB,rescueName,id,dog,cb){
      var url = requestURL.url(newDogDB,rescueName,id);
      console.log(url);
      console.log(typeof dog)
      $http.put(url,dog)
        .success(function(dog){
          if(cb){
            cb(dog);
          }
        })
        .error(function(err){
          console.log(err);
        });
    }

    return {
      editDog: editDog
    };
  });
})();
