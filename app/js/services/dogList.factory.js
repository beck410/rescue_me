;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('dogListFactory',function($http,FIREBASE_URL){

    function getDogList(dogDB,cb){
      var url = FIREBASE_URL + dogDB + '/.json';
      $http.get(url, {cache:true})
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
