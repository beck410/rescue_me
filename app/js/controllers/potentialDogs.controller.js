;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('potentialDogsController',function(dogListFactory,removeDogFactory,moveDogFactory,$location,$routeParams){
    var vm = this;
    vm.dogGroup = 'potential-dogs';
    vm.dogHeader = 'Potential Dogs';
    vm.nextDogGroup = 'Rescue';
    vm.configButtons = true;
    vm.newDogLink = '/#/potential-dogs/add';
    var rescueName = $routeParams.rescueName;

    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.dogs = dogs;
    });

    vm.removeDog = function(dog){
      removeDogFactory.removeDog('potentialDogs',dog,function(potentialDog){
        delete vm.dogs[potentialDog];
      });
    };

    vm.addToNextList = function(potentialID){
        $location.path(rescueName + '/rescue-dogs/' + potentialID + '/move');
    };
  })
  .controller('showPotentialDogController', function(dogDetailsFactory, $routeParams,$location, completeDogDetails,slideshowFactory,$sanitize){
    var vm = this;
    var dog = $routeParams.id;
    var rescueName = $routeParams.rescueName;
    vm.shelter = true;
    vm.ownNotes = true;

    dogDetailsFactory.getDogDetails('potentialDogs',dog,function(potentialDog){
      var completePotentialDog = completeDogDetails.fillEmptyDetails(potentialDog);
      vm.dog = completePotentialDog;
      if(vm.dog.animalPictures){
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
          };

          vm.prevImg = function(){
            vm.imgEndIndex -= 3;
          };

          vm.nextImgButton = function(){
            return slideshowFactory.nextDogButton(vm.imgEndIndex,vm.thumbnailLength);
          };

          vm.nextImg = function(){
            vm.imgEndIndex += 3;
          };
        });
      }
      vm.dog.sanitizedAnimalDescription = $sanitize(vm.dog.animalDescription);
    });
    vm.editDogDetails = function(){
      $location.path(rescueName + '/potential-dogs/' + dog + '/edit');
    };

  })
  .controller('movePotentialDog',function(US_STATES,moveDogFactory,dogDetailsFactory,$routeParams,$location,editDogFactory,$rootScope,$scope,uploadImage){
    var vm = this;
    var id = $routeParams.id;
    var rescueName = $routeParams.rescueName;
    vm.dogGroup = 'rescue-dogs';
    vm.potentialDog = true;
    vm.states = US_STATES;

    dogDetailsFactory.getDogDetails('shelterDogs',rescueName,id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      moveDogFactory.addDogToList('potentialDogs', rescueName,'shelterDogs',id,vm.dog,function(dog){
        if(vm.files){
          uploadImage.uploadToS3(vm.files,$rootScope.user.uid,vm.fileName,function(fileLink){
            var amazonLinks = [fileLink];
            var linkID = dog.name + '/amazonImg';
            editDogFactory.editDog('potentialDogs',rescueName,linkID,amazonLinks,function(){
              console.log('link added to fb: ' + fileLink);
              $location.path(rescueName + '/potential-dogs/');
            });
          });
        } else {
          $location.path(rescueName + '/potential-dogs/');
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
  })
  .controller('editPotentialDog',function(US_STATES,editDogFactory,dogDetailsFactory,$routeParams,$location,uploadImage,$scope,$rootScope){
    var vm = this;
    var id = $routeParams.id;
    var rescueName = $routeParams.rescueName;
    vm.dogGroup = 'potential-dogs';
    vm.potentialDog = true;
    vm.states = US_STATES;

    dogDetailsFactory.getDogDetails('potentialDogs',id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      editDogFactory.editDog('potentialDogs',id,vm.dog,function(){
        if(vm.files){
          uploadImage.uploadToS3(vm.files,$rootScope.user.uid,vm.fileName,function(fileLink){
            var amazonLinks = [fileLink];
            console.log(id);
            var linkID = id + '/amazonImg';

            editDogFactory.editDog('potentialDogs',linkID,amazonLinks,function(){
              console.log('link added to fb: ' + fileLink);
              $location.path(rescueName + '/potential-dogs/');
            });
          });
        } else {
          rescuedDogsCounter.updateCounter();
          $location.path(rescueName + '/potential-dogs/');
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
  })
  .controller('addPotentialDog',function(addNewDogFactory,$location,uploadImage,$scope,$rootScope,editDogFactory,$routeParams){
    var vm = this;
    vm.dogGroup = 'potential-dogs';
    var rescueName = $routeParams.rescueName;

    vm.submitDogDetails = function(){
      addNewDogFactory.addDog(vm.dog,'potentialDogs',function(dog){
        if(vm.files){
          uploadImage.uploadToS3(vm.files,$rootScope.user.uid,vm.fileName,function(fileLink){
            var amazonLinks = [fileLink];
            var linkID = dog.name + '/amazonImg';
            editDogFactory.editDog('potentialDogs',linkID,amazonLinks,function(){
              console.log('link added to fb: ' + fileLink);
              vm.dogs = vm.dogs || {};
              vm.dogs[dog.name] = vm.dog;
              vm.dog = {};
              $location.path(rescueName + '/potential-dogs');
            });
          });
        } else {
            vm.dogs = vm.dogs || {};
            vm.dogs[dog.name] = vm.dog;
            vm.dog = {};
            $location.path(rescueName + '/potential-dogs');
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
