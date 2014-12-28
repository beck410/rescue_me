;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('potentialDogsController',function(potentialFactory){
    var vm = this;
    potentialFactory.getPotentialDogs(function(dogs){
      vm.potentialDogs = dogs;
      console.log(vm.potentialDogs);
    });
  });
})();
