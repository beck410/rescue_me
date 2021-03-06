;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('rescueDetailsFactory', function(requestURL,$http,FIREBASE_URL,$routeParams){

    function getDetails(rescueName,cb){
      var url = requestURL.url('rescueDetails',rescueName);
      $http.get(url)
      .success(function(details){
        cb(details);
      })
      .error(function(err){
        console.log('get rescue details error:' + err);
      });
    }

    function editDetails(details,rescueName,cb){
      var url = requestURL.url('rescueDetails',rescueName);
      $http.put(url,details)
      .success(function(){
        cb();
      })
      .error(function(err){
        console.log(err);
      });
    }

    return {
      getDetails : getDetails,
      editDetails: editDetails
    };
  });
})();
