;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('rescuedDogsCounter',function($http,requestURL,$routeParams){
  var rescueName = $routeParams.rescueName;
  var _url = requestURL.url('rescuedDogsCounter',rescueName);
  console.log(_url)

    function getCounter(cb){
      console.log("url: " + _url)
      $http.get(_url)
      .success(function(number){
        cb(number);
      })
      .error(function(err){
        console.log(err);
      });
    }

    var updateCounter = function(){
      getCounter(function(currentCount){
        var newCount = currentCount + 1;
        $http.put(_url, newCount)
        .success(function(){
        })
        .error(function(err){
          console.log('change rescued dogs number error'+ err);
        });
      });
    };

    return {
      getCounter: getCounter,
      updateCounter: updateCounter
    };
  });
})();
