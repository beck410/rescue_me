;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('removeDogFactory',function($http,FIREBASE_URL){

    function removeDog(dogDB,dog,cb){
      var url = FIREBASE_URL + 'rescueDogs/' + dog + '.json';
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
