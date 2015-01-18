;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('requestURL',function(FIREBASE_URL,$rootScope){
    function url(db,rescueName,id){
      if($rootScope.user){
        if(id){
          return FIREBASE_URL + 'rescueOrgs/' + rescueName + '/' + db + '/' + id + '.json?auth=' + $rootScope.user.token;
        } else{
          return FIREBASE_URL + 'rescueOrgs/' + rescueName + '/' + db + '.json?auth=' + $rootScope.user.token;
        }    
      } else{
        if(id){
          return FIREBASE_URL + 'rescueOrgs/' + rescueName + '/' + db + '/' + id + '.json';
        } else{
          return FIREBASE_URL + 'rescueOrgs/' + rescueName + '/' + db + '.json';
        }    
      }
    }
    return {
      url: url
    };
  });
})();
