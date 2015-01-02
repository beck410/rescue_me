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

    vm.addToNextList = function(shelterID){
        $location.path('/potential-dogs/' + shelterID + '/move');
    };
  })
  .controller('showShelterController', function(dogDetailsFactory,$routeParams,completeDogDetails){
    var vm = this;
    var id = $routeParams.id;
    vm.shelter = true;
    dogDetailsFactory.getDogDetails('shelterDogs',id,function(shelterDog){
      var completeShelterDog = completeDogDetails.fillEmptyDetails(shelterDog);
      vm.dog = completeShelterDog;
    });
  });
})();
