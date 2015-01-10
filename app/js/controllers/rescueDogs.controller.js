;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('rescueDogsController',function(removeDogFactory,dogListFactory,$location){
    var vm = this;
    vm.dogGroup = 'rescue-dogs';
    vm.dogHeader = 'Rescue Dogs';
    vm.configButtons = true;
    vm.newDogLink = '/#/rescue-dogs/add';

    dogListFactory.getDogList('rescueDogs',function(rescueDogs){
      vm.dogs = rescueDogs;
    });

    vm.removeDog = function(dog){
      removeDogFactory.removeDog('rescueDogs',dog,function(rescueDog){
        delete vm.dogs[rescueDog];
      });
    };

    vm.addNewDog = function(){
      $location.path('/rescue-dogs/add');
    };
  })
.controller('showRescueController', function(dogDetailsFactory, $routeParams,$location,completeDogDetails,slideshowFactory,$sanitize){
  var vm = this;
  var id = $routeParams.id;
  vm.ownNotes = true;
  vm.foster = true;

  dogDetailsFactory.getDogDetails('rescueDogs',id,function(rescueDog){
    var completeRescueDog = completeDogDetails.fillEmptyDetails(rescueDog)
    vm.dog = completeRescueDog;
    vm.dog.sanitizedAnimalDescription = $sanitize(vm.dog.animalDescription);
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

  });

  vm.editDogDetails = function(){
    $location.path('/rescue-dogs/' + id + '/edit');
  };
})
.controller('moveRescueDog',function(moveDogFactory, dogDetailsFactory,$routeParams,$location,rescuedDogsCounter){
  var vm = this;
  var id = $routeParams.id;
  vm.dogGroup = 'potential-dogs';
  vm.rescueDog = true;

  dogDetailsFactory.getDogDetails('potentialDogs',id,function(dogDetails){
    vm.dog = dogDetails;
  });

  vm.submitDogDetails = function(){
    moveDogFactory.addDogToList('rescueDogs','potentialDogs',id,vm.dog,function(){
      rescuedDogsCounter.updateCounter();
      $location.path('/rescue-dogs/');
    });
  };
})
.controller('editRescueDog',function(editDetailsFactory,dogDetailsFactory,$routeParams,$location){
  var vm = this;
  var id = $routeParams.id;
  vm.dogGroup = 'rescue-dogs';
  vm.rescueDog = true;

  dogDetailsFactory.getDogDetails('rescueDogs',id,function(dogDetails){
    vm.dog = dogDetails;
  });

  vm.submitDogDetails = function(){
    editDogFactory.editDog('rescueDogs',id,vm.dog,function(){
      rescuedDogsCounter.updateCounter();
      $location.path('rescue-dogs/');
    });
  };

})
.controller('addRescueDog',function(rescuedDogsCounter,editDogFactory,addNewDogFactory,$location,$scope,$upload,$routeParams,$rootScope,uploadImage){
  var vm = this;
  vm.dogGroup = 'rescue-dogs';
  vm.rescueDog = true;

  vm.submitDogDetails = function(){
    addNewDogFactory.addDog(vm.dog,'rescueDogs',function(dog){
      if(vm.files){
        uploadImage.uploadToS3(vm.files,$rootScope.user.uid,vm.fileName,function(fileLink){
          var amazonLinks = [fileLink];
          var linkID = dog.name + '/amazonImg';
          editDogFactory.editDog('rescueDogs',linkID,amazonLinks,function(){
            console.log('link added to fb: ' + fileLink);
            rescuedDogsCounter.updateCounter();
            vm.dogs = vm.dogs || {};
            vm.dogs[dog.name] = vm.dog;
            vm.dog = {};
            $location.path('/rescue-dogs');
          });
        });
      } else {
        rescuedDogsCounter.updateCounter();
        vm.dogs = vm.dogs || {};
        vm.dogs[dog.name] = vm.dog;
        vm.dog = {};
        $location.path('/rescue-dogs');
      }
    });
  };

  vm.fileSelected = function(event){
    uploadImage.setThumbnail(vm.files[0],function(fileName,base64){
      vm.fileName = fileName;
      vm.files[0].dataUrl = base64;
      $scope.$apply();
    });
  };
});
})();
