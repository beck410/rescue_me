;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(shelterFactory, $rootScope){

    var vm = this;
    console.log($rootScope.shelterDogs)
    if(!$rootScope.shelterDogs){
      shelterFactory.getShelterDogs(function(shelterDogs){
        vm.shelterDogs = shelterDogs;
        console.log('http')
      });
    } else {
      vm.shelterDogs = $rootScope.shelterDogs;
      console.log('rootScope');
    }
  })
  .controller('showShelterController', function(shelterFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    shelterFactory.getShelterDogDetails(id,function(shelterDog){
      vm.shelterDog = shelterDog;
      console.log(vm.shelterDog);
    });
  });
})();


