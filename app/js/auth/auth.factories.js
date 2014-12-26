;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('authFactory', function($http,RESCUE_GROUPS_URL, FIREBASE_URL, $location){

    function login(email,password,mainCB){
      var ref= new Firebase(FIREBASE_URL);
      console.log(ref);
      ref.authWithPassword({
        email: email,
        password: password,
      }, function(error, authData){
        if(error === null) {
          console.log('user logged in', authData);
          _getShelterDogs(function(){
            _getShelterOrgs(function(){
              _addContactInfo(function(){
                _postDogsToFirebase(mainCB);
              })
            })
          });
       } else {
          console.log('Error creating user:' + error);
        }
      });
    }

    function _getShelterDogs(cb){
      console.log('getShelterDogs');
      cb();
    }

    function _getShelterOrgs(cb){
      console.log('getShelterOrgs');
      cb();
    }

    function _addContactInfo(cb){
      console.log('addContactInfo');
      cb();
    }

    function _postDogsToFirebase(cb){
      console.log('postDogsToFirebase');
      cb();
    }


    return {
      login: login
    };
  });
})();
