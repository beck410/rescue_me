;(function(){
  'use strict';
  angular.module('rescue_me')
  .directive('targetBlank', function() {
    return {
      compile: function(element) {
        var elems = (element.prop('tagName') === 'A') ? element : element.find('a');
        elems.attr('target', '_blank');
      }
    };
  });
})();
