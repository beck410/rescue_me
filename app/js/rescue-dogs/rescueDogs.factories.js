;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('rescueFactory',function(FIREBASE_URL,$http){

    function getRescueDogs(cb){
      var url = FIREBASE_URL + 'rescueDogs.json';
      $http.get(url)
      .success(function(dogs){
        cb(dogs);
      })
      .error(function(err){
        console.log('rescue dog list error: ' + err);
      });
    }

    function getDogDetails(dog, cb){
      var url = FIREBASE_URL + 'rescueDogs/' + dog + '.json';
      console.log(url);
      $http.get(url)
      .success(function(rescueDog){
        cb(rescueDog);
      })
      .error(function(err){
        console.log('get rescue dog details err:' + err);
      });
    }

    function removeDog(dog,cb){
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
      getRescueDogs: getRescueDogs,
      getDogDetails: getDogDetails,
      removeDog: removeDog
    };
  });
})();
