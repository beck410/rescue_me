angular.module('rescue_me')
.filter('pagination',function(){
  'use strict'
  return function(input,start){
    if(!input || !input.length){
      return;
    }
    start = +start;
    return input.slice(start);
  };
})
