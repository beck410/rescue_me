;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('rescueDetailsFactory', function($http,FIREBASE_URL){

    function getDetails(cb){
      var url = FIREBASE_URL + 'rescueDetails.json';
      $http.get(url)
      .success(function(details){
        cb(details);
      })
      .error(function(err){
        console.log('get rescue details error:' + err);
      })
    }
    return {
     getDetails : getDetails
    };
  });
})();
