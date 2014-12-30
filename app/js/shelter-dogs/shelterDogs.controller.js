;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(shelterFactory,dogListFactory,$location){

    var vm = this;
    vm.dogGroup = 'find-dogs';

    dogListFactory.getDogList('shelterDogs',function(shelterDogs){
      vm.dogs = shelterDogs;
    });

    vm.addToPotentialList = function(shelterID,dog){
      shelterFactory.addToPotentialList(shelterID,dog,function(dog){
        delete vm.shelterDogs[dog];
        $location.path('/potential-dogs');
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

