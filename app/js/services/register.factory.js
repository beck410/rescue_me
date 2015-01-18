;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('registerFactory',function(loginFactory,requestURL,FIREBASE_URL,$http,$rootScope){
    var ref = new Firebase(FIREBASE_URL);
    
    function register(user,cb){
      ref.createUser({
        email: user.email,
        password: user.password
      },function(error){
        if(error === null){
          loginFactory.login(user.email,user.password,user.userName,function(){
            var userURL = FIREBASE_URL + 'users/' + $rootScope.user.uid + '/rescueDetails/' + '.json?auth=' + $rootScope.user.token;
            var rescueURL = FIREBASE_URL + 'rescueOrgs/' + $rootScope.rescueName + '/rescueDetails/' + '.json?auth=' + $rootScope.user.token;
            _addRescueDetails(user,userURL);
            _addRescueDetails(user,rescueURL,cb);
          }) ;         
        } else{
          console.log('Error creating user: ' + error);
        }
      });
    }

    function _addRescueDetails(details,url,cb){
      $http.put(url,details)
      .success(function(details){
        console.log('Rescue details added');
        if(cb){
          cb(details.userName);
        }
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
