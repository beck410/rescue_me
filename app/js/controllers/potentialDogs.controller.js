;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('potentialDogsController',function(dogListFactory,removeDogFactory,moveDogFactory,$location){
    var vm = this;
    vm.dogGroup = 'potential-dogs';
    vm.dogHeader = 'Potential Dogs';
    vm.nextDogGroup = 'Rescue';
    vm.configButtons = true;
    vm.newDogLink = '/#/potential-dogs/add'

    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.dogs = dogs;
    });

    vm.removeDog = function(dog){
      removeDogFactory.removeDog('potentialDogs',dog,function(potentialDog){
        delete vm.dogs[potentialDog];
      });
    };

    vm.addToNextList = function(potentialID){
        $location.path('/rescue-dogs/' + potentialID + '/move');
    };
  })
  .controller('showPotentialDogController', function(dogDetailsFactory, $routeParams,$location, completeDogDetails,slideshowFactory,$sanitize){
    var vm = this;
    var dog = $routeParams.id;
    vm.shelter = true;
    vm.ownNotes = true;

    dogDetailsFactory.getDogDetails('potentialDogs',dog,function(potentialDog){
      var completePotentialDog = completeDogDetails.fillEmptyDetails(potentialDog);
      vm.dog = completePotentialDog;

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
        }
      });
      vm.dog.sanitizedAnimalDescription = $sanitize(vm.dog.animalDescription);
    });
    vm.editDetailsDetails = function(){
      $location.path('/potential-dogs/' + dog + '/edit');
    };

  })
  .controller('movePotentialDog',function(US_STATES,moveDogFactory,dogDetailsFactory,$routeParams,$location){
    var vm = this;
    var id = $routeParams.id;
    vm.dogGroup = 'rescue-dogs';
    vm.potentialDog = true;
    vm.states = US_STATES;

    dogDetailsFactory.getDogDetails('shelterDogs',id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      moveDogFactory.addDogToList('potentialDogs','shelterDogs',id,vm.dog,function(){
        $location.path('/potential-dogs/');
      });
    };
  })
  .controller('editPotentialDog',function(US_STATES,editDetailsFactory,dogDetailsFactory,$routeParams,$location){
    var vm = this;
    var id = $routeParams.id;
    vm.dogGroup = 'potential-dogs';
    vm.potentialDog = true;
    vm.states = US_STATES;

    dogDetailsFactory.getDogDetails('potentialDogs',id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      editDetailsFactory.editDetails('potentialDogs',id,vm.dog,function(){
        $location.path('potential-dogs');
      });
    };
  })
  .controller('addPotentialDog',function(addNewDogFactory,$location){
    var vm = this;
    vm.dogGroup = 'potential-dogs';

    vm.submitDogDetails = function(){
      addNewDogFactory.addDog(vm.dog,'potentialDogs',function(dog){
        vm.dogs = vm.dogs || {};
        vm.dogs[dog.name] = vm.dog;
        vm.dog = {};
        $location.path('/potential-dogs');
      });
    };
  });
})();
