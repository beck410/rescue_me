;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('potentialDogsController',function(potentialFactory){
    var vm = this;
    potentialFactory.getPotentialDogs(function(dogs){
      vm.potentialDogs = dogs;
      console.log(vm.potentialDogs);
    });
  })
  .controller('showPotentialDogController', function(potentialFactory, $routeParams){
    var vm = this;
    var dog = $routeParams.id;
    potentialFactory.getDogDetails(dog,function(potentialDog){
      vm.dog = potentialDog;
    });
  });
})();
