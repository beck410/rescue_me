;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('authFactory', function($http, FIREBASE_URL, $location){

    function _login(email,password,cb){
      var ref= new Firebase(FIREBASE_URL);
      console.log(ref);
      ref.authWithPassword({
        email: email,
        password: password,
      }, function(error, authData){
        if(error === null) {
          console.log('user logged in', authData);
          cb();
        } else {
          console.log('Error creating user:' + error);
        }
      });
    }

    return {
      login: _login
    };
  });
})();
