;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('dogListFactory',function($http,FIREBASE_URL,requestURL){

    function getDogList(dogDB,rescueName,cb){
      var url = requestURL.url(dogDB,rescueName);
      $http.get(url)
        .success(function(dogs){
          cb(dogs);
        })
        .error(function(err){
          console.log('get Dog list error:' + err);
       });
    }

    return {
      getDogList: getDogList,
    };
  });
})();
