;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('editDogFactory',function(FIREBASE_URL,$http){

    function editDog(dogDB,id,dog,cb){
      _postDog(dogDB,id,dog,cb);
    }

    function _postDog(newDogDB,id,dog,cb){
      var url = FIREBASE_URL + newDogDB + '/' + id + '.json';
      $http.put(url,dog)
        .success(function(dog){
          if(cb){
            cb(dog);
          }
        })
        .error(function(err){
          console.log('post dog error: ' + err);
        });
    }

    return {
      editDog: editDog
    };
  });
})();
