;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('rescueName',function($rootScope,FIREBASE_URL,$http){

    function getRescueName(cb){
      var url = FIREBASE_URL + 'users/' + $rootScope.user.uid + '/rescueDetails/' + '.json?auth=' + $rootScope.user.token;
      console.log(url)
      
      $http.get(url)
      .success(function(details){
        cb(details);
      })
      .error(function(err){
        console.log('get rescue name error: ',err);
      });
    }

    return {
      getRescueName: getRescueName
    };
  });
})();
