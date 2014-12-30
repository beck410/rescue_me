;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('rescueDogsController',function(rescueFactory){
    var vm = this;
    rescueFactory.getRescueDogs(function(dogs){
      vm.rescueDogs = dogs;
      console.log(vm.rescueDogs);
    });
  });
})();
