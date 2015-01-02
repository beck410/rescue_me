;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('registerFactory',function(loginFactory,requestURL,FIREBASE_URL,$http){
    var ref = new Firebase(FIREBASE_URL);

    function register(user,cb){
      ref.createUser({
        email: user.email,
        password: user.password
      },function(error,authData){
        if(error === null){
          console.log('user created successfully', authData);
          loginFactory.login(user.email, user.password, function(){
            _addRescueDetails(user,authData.uid,cb);
          });
        } else{
          console.log('Error creating user: ' + error);
        }
      });
    }

    function _addRescueDetails(rescue,id,cb){
      var url = requestURL.url('rescueDetails');
      console.log(url);
      $http.put(url,rescue)
      .success(function(){
        console.log('Rescue details added');
        cb();
      })
      .error(function(err){
        console.log('adding rescue details error: ' + err);
      });
    }

    return {
      register: register
    };
  });
})();
