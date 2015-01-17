;(function(){
  'use strict'; 
  angular.module('rescue_me')
  .controller('mainMenuController',function($rootScope,$http,FIREBASE_URL){
    var vm = this;
    if(!$rootScope.rescueName && $rootScope.user){
      var url = FIREBASE_URL + 'users/' + $rootScope.user.uid  + '/rescueDetails.json?auth=' + $rootScope.user.token;
      $http.get(url)
      .success(function(details){
        console.log(details);
        vm.rescueName = details.userName;
      })
      .error(function(err){
        console.log('rescueDetails error: ',err);
      });
    } else {
      vm.rescueName = $rootScope.rescueName
    }
  });
})();
