;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory,dogListFactory, completeDogDetails,slideshowFactory){
    var vm = this;

    rescueDetailsFactory.getDetails(function(details){
      var completeDetails = completeDogDetails.fillEmptyDetails(details);
      vm.rescueOrg = completeDetails;
    });

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

    dogListFactory.getDogList('rescueDogs',function(dogs){
      vm.rescueDogs = dogs;
      vm.rescueDogsLength = (_.size(dogs));
    });

      });
})();
