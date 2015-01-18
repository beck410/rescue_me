;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('requestURL',function(FIREBASE_URL,$rootScope){
    function url(db,rescueName,id){
      if(id){
        return FIREBASE_URL + 'rescueOrgs/' + rescueName + '/' + db + '/' + id + '.json?auth=' + $rootScope.user.token;
      } else if($rootScope.user){
        return FIREBASE_URL + 'rescueOrgs/' + rescueName + '/' + db + '.json?auth=' + $rootScope.user.token;
      }     
    }
    return {
      url: url
    };
  });
})();
