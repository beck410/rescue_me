;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(moveDogFactory,dogListFactory,$location,filterDogsFactory,$timeout){

    var vm = this;
    vm.dogGroup = 'find-dogs';
    vm.dogHeader = 'Find Shelter Dogs';
    vm.nextDogGroup = 'Potential';
    vm.filterDogs = false;
    vm.filterDogsHeader = true;
    vm.apiKeys = {};

    dogListFactory.getDogList('shelterDogs',function(shelterDogs){
      vm.dogs = shelterDogs;
    });

    vm.addToNextList = function(shelterID){
        $location.path('/potential-dogs/' + shelterID + '/move');
    };

    vm.filteredShelterDogs = function(){
      if(vm.apiKeys !== {}){
        filterDogsFactory.addKeyFilters(vm.apiKeys,function(filterDogs){
          vm.dogs = filterDogs;
          vm.apiKeys = {};
        });
      } else {
        vm.emptyFilterMessage = true;
        $timeout(function(){
          vm.emptyFilterMessage = false;
        },3000)
      } ;
    }

    vm.clearForm = function(){
      console.log('working')
      console.log(vm.apiKeys);
      vm.apiKeys = {};
    }
  })
  .controller('showShelterController', function(dogDetailsFactory,$routeParams,completeDogDetails,$sce,$sanitize){
    var vm = this;
    var id = $routeParams.id;
    vm.shelter = true;

    dogDetailsFactory.getDogDetails('shelterDogs',id,function(shelterDog){
      var completeShelterDog = completeDogDetails.fillEmptyDetails(shelterDog);
      vm.dog = completeShelterDog;
      dogDetailsFactory.getFullSizeImages(vm.dog.animalPictures,function(images){
        vm.dog.fullSizeImages = images;
        console.log(vm.dog.fullSizeImages)
      });
      dogDetailsFactory.getThumbnailImages(vm.dog.animalPictures,function(images){
        vm.dog.thumbnails = images;
        console.log(vm.dog.thumbnails);
      });
      vm.dog.sanitizedAnimalDescription = $sanitize(vm.dog.animalDescription);
    });
  });
})();
