;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(shelterFactory){

    var vm = this;

    shelterFactory.getShelterDogs(function(shelterDogs){
      vm.shelterDogs = shelterDogs;
      console.log(vm.shelterDogs);
    });

  });
})();


