;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('dogListFactory',function($http,FIREBASE_URL,requestURL){

    function getDogList(dogDB,cb){
      var url = requestURL.url(dogDB);
      $http.get(url)
        .success(function(dogs){
          cb(dogs);
        })
        .error(function(err){
          console.log('get Dog list error:' + err);
       });
    }

    function objToArray(obj){
      var array = _.map(obj, function(el){
            return el;
      });
      return array;
    }

    return {
      getDogList: getDogList,
      objToArray: objToArray
    };
  });
})();
