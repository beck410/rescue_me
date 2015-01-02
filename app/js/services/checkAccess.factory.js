;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('checkAccessFactory',function($location,FIREBASE_URL){
    var ref = new Firebase(FIREBASE_URL);

    function requireLogin() {
      if(!_isLoggedIn()){
        $location.path('/login');
      } else if(_hasTemporaryPassword()){
          $location.path('/changepassword');
      }
    }

    function _isLoggedIn() {
      return Boolean(ref.getAuth());
    }
    function _hasTemporaryPassword() {
      return ref.getAuth().password.isTemporaryPassword;
    }
    return {
      requireLogin: requireLogin
    };
  });
})();
