;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('shelterDogsController',function(moveDogFactory,dogListFactory,$location,filterDogsFactory,$timeout,$routeParams){

    var vm = this;
    var rescueName = $routeParams.rescueName;
    vm.dogGroup = 'find-dogs';
    vm.dogHeader = 'Find Shelter Dogs';
    vm.nextDogGroup = 'Potential';
    vm.filterDogs = false;
    vm.filterDogsHeader = true;
    vm.apiKeys = {};

    dogListFactory.getDogList('shelterDogs',rescueName,function(shelterDogs){
      vm.dogs = shelterDogs;
    });

    vm.addToNextList = function(shelterID){
      $location.path(rescueName + '/potential-dogs/' + shelterID + '/move');
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
.controller('showShelterController', function(dogDetailsFactory,$routeParams,completeDogDetails,$sce,$sanitize,slideshowFactory){
  var vm = this;
  var id = $routeParams.id;
  var rescueName = $routeParams.rescueName;
  vm.shelter = true;

  dogDetailsFactory.getDogDetails('shelterDogs',id,function(shelterDog){
    var completeShelterDog = completeDogDetails.fillEmptyDetails(shelterDog);
    vm.dog = completeShelterDog;
    dogDetailsFactory.getFullSizeImages(vm.dog.animalPictures,function(images){
      vm.dog.fullSizeImages = images;
    });
    dogDetailsFactory.getThumbnailImages(vm.dog.animalPictures,function(images){
      vm.dog.thumbnails = images;
      vm.imgStartIndex = 3;
      vm.imgEndIndex = 3;
      vm.thumbnailLength = _.size(images);

      vm.prevImgButton = function(){
        return slideshowFactory.prevDogButton(vm.imgEndIndex, 3);
      }

      vm.prevImg = function(){
        vm.imgEndIndex -= 3;
      }

      vm.nextImgButton = function(){
        return slideshowFactory.nextDogButton(vm.imgEndIndex,vm.thumbnailLength);
      }

      vm.nextImg = function(){
        vm.imgEndIndex += 3;
      };
    });
    vm.dog.sanitizedAnimalDescription = $sanitize(vm.dog.animalDescription);
  });
});
})();
