;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(shelterFactory){

    var vm = this;
    shelterFactory.getShelterDogs(function(shelterDogs){
      vm.shelterDogs = shelterDogs;
      console.log(vm.shelterDogs);
    })

  })
  .controller('showShelterController', function(shelterFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    shelterFactory.getShelterDogDetails(id,function(shelterDog){
      vm.shelterDog = shelterDog;
    });
  });
})();

