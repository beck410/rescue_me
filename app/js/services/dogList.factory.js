;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('dogListFactory',function($http,FIREBASE_URL){

    function getDogList(dogdb,cb){
      var url = FIREBASE_URL + dogdb + '/.json';
      $http.get(url)
        .success(function(dogs){
          cb(dogs);
        })
        .error(function(err){
          console.log('get Dog list error:' + err);
       });

    }
    return {
      getDogList: getDogList
    };
  });
})();
