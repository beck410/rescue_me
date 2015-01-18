;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('removeDogFactory',function(requestURL,$http,FIREBASE_URL){

    function removeDog(dogDB,rescueName,dog,cb){
    var url =  requestURL.url(dogDB,rescueName,dog)
    $http.delete(url)
      .success(function(){
        cb(dog);
      })
      .error(function(err){
        console.log('delete rescue dog error: ' + err);
      });
    }

    return {
      removeDog: removeDog
    };
  });
})();
