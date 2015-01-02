;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('completeDogDetails',function(){

    function fillEmptyDetails(obj) {
      for(var detail in obj){
        if(obj.hasOwnProperty(detail)){
          if(obj[detail] === ''){
            obj[detail] = 'N/A';
          }
        }
      }
      return obj;
    }
    return {
      fillEmptyDetails: fillEmptyDetails
    };
  });
})();
