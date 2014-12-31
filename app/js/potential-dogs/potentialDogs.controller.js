;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('potentialDogsController',function(potentialFactory,dogListFactory,$location){
    var vm = this;
    vm.dogGroup = 'potential-dogs';
    vm.dogHeader = 'Potential Dogs';
    vm.nextDogGroup = 'Rescue';
    vm.removeButton = true;

    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.dogs = dogs;
    });

    vm.addToRescueList = function(potentialID,dog){
      potentialFactory.addToRescueList(potentialID,dog,function(dog){
        delete vm.potentialDogs[dog];
        $location.path('/rescue-dogs');
      });
    };
  })
  .controller('showPotentialDogController', function(dogDetailsFactory, $routeParams){
    var vm = this;
    var dog = $routeParams.id;
    dogDetailsFactory.getDogDetails('potentialDogs',dog,function(potentialDog){
      vm.dog = potentialDog;
      console.log(vm.dog)
    });
  });
})();
