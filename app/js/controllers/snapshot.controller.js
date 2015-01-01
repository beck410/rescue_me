;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory){
    var vm = this;
    vm.rescueGroupName = 'Russell Rescue';

    rescueDetailsFactory.getDetails(function(details){
      vm.rescue = details;
    });
  });
})();
