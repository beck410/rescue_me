;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('editDetailsFactory',function(requestURL,FIREBASE_URL,$http){

    function editDetails(dataset,id,details,cb){
      _postDog(dataset,id,details,cb);
    }

    function _postDetails(dataset,id,details,cb){
      var url = requestURL.url(dataset,id);
      $http.put(url,details)
        .success(function(details){
          if(cb){
            cb(details);
          }
        })
        .error(function(err){
          console.log('post details error: ' + err);
        });
    }

    return {
      editDetails: editDetails
    };
  });
})();
