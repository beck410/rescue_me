;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('registerFactory',function(FIREBASE_URL,$http){
    var ref = new Firebase(FIREBASE_URL);

    function register(user, cb){
      ref.createUser({
        email: user.email,
        password: user.password
      },function(error, authData){
        if(error === null){
          console.log('user created successfully', authData);
          _addRescueDetails(user,cb);
        } else {
          console.log('Error creating user: ' + error);
        }
      });
    }

    function _addRescueDetails(rescue,cb){
      var url = FIREBASE_URL + 'rescueDetails.json';
      $http.put(url,rescue)
    .success(function(){
      console.log('Rescue details added');
    })
      .error(function(err){
        console.log('adding rescue details error: ' + err);
      })
    }

    return {
      register: register
    };
  });
})();
