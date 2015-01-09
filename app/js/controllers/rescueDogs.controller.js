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

  vm.editDetailsDetails = function(){
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
    editDetailsFactory.editDetails('rescueDogs',id,vm.dog,function(){
      rescuedDogsCounter.updateCounter();
      $location.path('rescue-dogs/');
    });
  };

})
.controller('addRescueDog',function(rescuedDogsCounter,addNewDogFactory,$location,$scope,$upload,$routeParams,$rootScope){
  var vm = this;
  vm.dogGroup = 'rescue-dogs';
  vm.rescueDog = true;
  var id = $routeParams.id;

  vm.submitDogDetails = function(){
    addNewDogFactory.addDog(vm.dog,'rescueDogs',function(dog){
      rescuedDogsCounter.updateCounter();
      vm.dogs = vm.dogs || {};
      vm.dogs[dog.name] = vm.dog;
      vm.dog = {};
      $location.path('/rescue-dogs');
    });
  };

  vm.fileSelected = function(event){
    console.log(vm.files,event)
    _setThumbnail();
  }

  vm.upload = function(){
    var file = vm.files[0];
    $upload.upload({
      url: 'https://rescuemeimages.s3.amazonaws.com',
      method: 'POST',
      data: {
        'Content-Type': file.type,
        key: $rootScope.user.uid + '/' + id + '.jpg',
        acl: 'public-read',
        awsaccesskeyid: 'AKIAIMC5Y5S4NKCKEMVQ',
        policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQwMDowMDowMFoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJyZXNjdWVtZWltYWdlcyJ9LHsiYWNsIjogInB1YmxpYy1yZWFkIn0sWyJzdGFydHMtd2l0aCIsIiRDb250ZW50LVR5cGUiLCIiXSxbInN0YXJ0cy13aXRoIiwiJGtleSIsIiJdXX0=",
      signature: "oiRkj3Tri/V5D6WSJ0kJ6B4evSQ="
      },
      file: file
    })
    .success(function(){
      console.log('file sent to AWS');
    })
  }

  function _setThumbnail(){
    _imageToBase64(vm.files[0],function(base64){
      console.log(base64)
      vm.files[0].dataUrl = base64;
      $scope.$apply();
    })
  }

  function _imageToBase64(file,cb){
    if(file && file.type.indexOf('image') > -1){
      var fr = new FileReader();
      console.log(fr)
      fr.readAsDataURL(file);
      fr.onload = function(e){
        cb(e.target.result);
      }
    }
  }

});
})();
