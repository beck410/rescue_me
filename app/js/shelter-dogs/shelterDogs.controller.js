;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(shelterFactory){

    var vm = this;

    shelterFactory.getShelterDogs(function(data){
      vm.shelterDogs = data;
      console.log(vm.shelterDogs);
    });

  });
})();
