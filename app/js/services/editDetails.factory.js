;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('editDogFactory',function(requestURL,FIREBASE_URL,$http){

    function editDog(dogDB,id,dog,cb){
      _postDog(dogDB,id,dog,cb);
    }

    function _postDog(newDogDB,id,dog,cb){
      var url = requestURL.url(newDogDB,id);
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
