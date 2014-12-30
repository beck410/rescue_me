;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('potentialDogsController',function(potentialFactory,dogListFactory,$location){
    var vm = this;
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
  .controller('showPotentialDogController', function(potentialFactory, $routeParams){
    var vm = this;
    var dog = $routeParams.id;
    potentialFactory.getDogDetails(dog,function(potentialDog){
      vm.dog = potentialDog;
    });
  });
})();
