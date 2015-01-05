;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('objToArrayFactory',function(){

    function objToArray(obj){
      var array = _.map(obj, function(el){
      return el;
    });
      return array;
    }

    return {
      objToArray: objToArray
    };

  });
})();
