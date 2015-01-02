;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('requestURL',function($rootScope,FIREBASE_URL){
    function url(db,id){
      if(id){
        return FIREBASE_URL + 'users/' + $rootScope.user.uid + '/' + db + '/' + id + '.json?auth=' + $rootScope.user.token;
      } else {
        return FIREBASE_URL + 'users/' + $rootScope.user.uid + '/' + db + '/.json?auth=' + $rootScope.user.token;
      }
    }
    return {
      url: url
    };
  });
})();
