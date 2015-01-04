;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory,dogListFactory, completeDogDetails,slideshowFactory){
    var vm = this;

    rescueDetailsFactory.getDetails(function(details){
      var completeDetails = completeDogDetails.fillEmptyDetails(details);
      vm.rescueOrg = completeDetails;
    });

    //POTENTIAL DOGS
    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.potentialDogsArray = dogListFactory.objToArray(dogs);

      vm.potentialDogsLength = (_.size(dogs));
      vm.potentialStartIndex = 3;
      vm.potentialEndIndex = 3;

      vm.prevPotentialDogButton = function(){
        return slideshowFactory.prevDogButton(vm.potentialEndIndex, 3)
      };

      vm.nextPotentialDogButton = function(){
       return slideshowFactory.nextDogButton(vm.potentialEndIndex,vm.potentialDogsLength);
      };

      vm.nextPotentialDogs = function(){
        vm.potentialEndIndex += 3;
      }

      vm.prevPotentialDogs = function(){
        vm.potentialEndIndex -= 3;
      }

    });

    //RESCUE DOGS

    dogListFactory.getDogList('rescueDogs',function(dogs){
      vm.rescueDogsArray = dogListFactory.objToArray(dogs);
      var _rescueDogsLength = (_.size(dogs));
    vm.rescueStartIndex = 5;
    vm.rescueEndIndex = 5;

    vm.prevRescueDogButton = function(){
       return slideshowFactory.prevDogButton(vm.rescueEndIndex, 5);
    }

    vm.nextRescueDogButton =function(){
      return slideshowFactory.nextDogButton(vm.rescueEndIndex,_rescueDogsLength);
    }

    vm.nextRescueDogs = function(){
      vm.rescueEndIndex += 5;
    }

    vm.prevRescueDogs = function(){
      vm.rescueEndIndex -= 5;
    }
    });
  })
})();
