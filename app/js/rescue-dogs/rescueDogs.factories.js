;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('rescueFactory',function(FIREBASE_URL,$http){

    function getRescueDogs(cb){
      var url = FIREBASE_URL + 'rescueDogs.json'
      $http.get(url)
      .success(function(dogs){
        cb(dogs);
      })
      .error(function(){
        console.log('rescue dog list error: ' + err);
      });
    }
    return {
      getRescueDogs: getRescueDogs
    };
  });
})();
