;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('requestURL',function($rootScope,FIREBASE_URL){
    function url(db,id){
      if(id){
        return FIREBASE_URL + 'users/' + $rootScope.user.uid + '/' + db + '/' + id + '.json';
      } else {
        return FIREBASE_URL + 'users/' + $rootScope.user.uid + '/' + db + '/.json';
      }
    }
    return {
      url: url
    };
  });
})();
