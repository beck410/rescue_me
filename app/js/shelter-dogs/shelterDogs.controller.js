;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(shelterFactory,$location){

    var vm = this;
    shelterFactory.getShelterDogs(function(shelterDogs){
      vm.shelterDogs = shelterDogs;
    });

    vm.addToPotentialList = function(shelterID,dog){
      shelterFactory.addToPotentialList(shelterID,dog,function(dog){
        delete vm.shelterDogs[dog];
        $location.path('/potential-dogs');
      });
    };
  })
  .controller('showShelterController', function(shelterFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    shelterFactory.getShelterDogDetails(id,function(shelterDog){
      vm.dog = shelterDog;
    });
  });
})();

