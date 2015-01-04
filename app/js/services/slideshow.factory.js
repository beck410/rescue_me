;(function(){
  'use strict';
  angular.module('rescue_me')
  .factory('slideshowFactory',function(){
    function prevDogButton(endIndex,number){
      if(endIndex === number){
        return true;
      } else {
        return false;
      }

    }

    function nextDogButton(endIndex,dogsLength){
      if(endIndex >= dogsLength){
        return true;
      } else {
        return false;
      }

    }

    return {
      nextDogButton: nextDogButton,
      prevDogButton: prevDogButton
    };
  });
})();
