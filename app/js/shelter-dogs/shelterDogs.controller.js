;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(shelterFactory){

    var vm = this;

    shelterFactory.getShelterDogs(function(data){
      var transformedData = shelterFactory.objectToArray(data);
      vm.shelterDogs = transformedData;
      console.log(vm.shelterDogs);
    });

  });
})();
