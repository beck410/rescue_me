;(function(){
  'use strict'; 
  angular.module('rescue_me')
  .controller('mainMenuController',function($rootScope,$http,FIREBASE_URL,rescueName){
    var vm = this;
    if($rootScope.user){
      if(!$rootScope.rescueName){
        rescueName.getRescueName(function(details){
          console.log(details);
          vm.rescueName = details.userName;
        });
      } else {
        vm.rescueName = $rootScope.rescueName;
      }
    }
  });
})();
