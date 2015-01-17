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
            console.log($rootScope.users);
            _addRescueDetails(user,cb);
          }) ;         
        } else{
          console.log('Error creating user: ' + error);
        }
      });
    }

    // function _getAuthToken(){
    //   var url = FIREBASE_URL + 
    // }

    function _addRescueDetails(rescue,cb){
      var url = FIREBASE_URL + 'rescues/' + rescue.userName + '/rescueDetails/' + '.json?auth=' + $rootScope.user.token;
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
