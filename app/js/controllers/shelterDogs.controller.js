;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(moveDogFactory,dogListFactory,$location){

    var vm = this;
    vm.dogGroup = 'find-dogs';
    vm.dogHeader = 'Find Shelter Dogs';
    vm.nextDogGroup = 'Potential';

    dogListFactory.getDogList('shelterDogs',function(shelterDogs){
      vm.dogs = shelterDogs;
    });

    vm.addToNextList = function(shelterID,dog){
      moveDogFactory.addToNextList('potentialDogs','shelterDogs',shelterID,dog,function(dog){
        delete vm.dogs[dog];
        $location.path('/potential-dogs/' + dog.name + '/edit');
      });
    };
  })
  .controller('showShelterController', function(dogDetailsFactory,$routeParams){
    var vm = this;
    var id = $routeParams.id;
    dogDetailsFactory.getDogDetails('shelterDogs',id,function(shelterDog){
      vm.dog = shelterDog;
    });
  });
})();
