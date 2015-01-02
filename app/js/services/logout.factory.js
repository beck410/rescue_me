;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('logoutFactory',function($rootScope,FIREBASE_URL){

    function logout(cb){
      var ref = new Firebase(FIREBASE_URL);
      ref.unauth(function(){
        $rootScope.user = null;
        console.log('user logged out');
        cb();
      });
    }

    return {
      logout: logout
    };
  });
})();
