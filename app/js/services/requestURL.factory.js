;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('requestURL',function(FIREBASE_URL,$rootScope){
    function url(db,rescueName,id){
      if(id){
        return FIREBASE_URL + 'rescues/' + rescueName + '/' + db + '/' + id + '.json?auth=' + $rootScope.user.token;
      } else {
        return FIREBASE_URL + 'rescues/' + rescueName + '/' + db + '.json?auth=' + $rootScope.user.token;
      }
    }
    return {
      url: url
    };
  });
})();
