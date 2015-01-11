;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory,dogListFactory, completeDogDetails,slideshowFactory,objToArrayFactory,rescuedDogsCounter,$location,$window,$rootScope){


    var vm = this;
    rescuedDogsCounter.getCounter(function(count){
      console.log('count: ' + count);
      vm.dogsRescued = count;
    })

    rescueDetailsFactory.getDetails(function(details){
      var completeDetails = completeDogDetails.fillEmptyDetails(details);
      vm.rescueOrg = completeDetails;
    });

    //POTENTIAL DOGS
    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.potentialDogsArray = objToArrayFactory.objToArray(dogs);

      vm.potentialDogsLength = (_.size(dogs));
      vm.potentialStartIndex = 2;
      vm.potentialEndIndex = 2;

      vm.prevPotentialDogButton = function(){
        return slideshowFactory.prevDogButton(vm.potentialEndIndex, 2);
      };

      vm.nextPotentialDogButton = function(){
       return slideshowFactory.nextDogButton(vm.potentialEndIndex,vm.potentialDogsLength);
      };

      vm.nextPotentialDogs = function(){
        vm.potentialEndIndex += 2;
      };

      vm.prevPotentialDogs = function(){
        vm.potentialEndIndex -= 2;
      };
    });

    //RESCUE DOGS

    dogListFactory.getDogList('rescueDogs',function(dogs){
      vm.rescueDogsArray = objToArrayFactory.objToArray(dogs);
    vm.rescueDogsLength = (_.size(dogs));
    vm.rescueStartIndex = 5;
    vm.rescueEndIndex = 5;

    vm.open = function(amazon,animalPic){
      if(amazon){
        console.log('amazon: ' + amazon);
      } else if(animalPic) {
      console.log('animalPic: ',animalPic);
      } else {
        console.log('images/default-dog.png');
      }
    }


    vm.prevRescueDogButton = function(){
       return slideshowFactory.prevDogButton(vm.rescueEndIndex, 5);
    };

    vm.nextRescueDogButton =function(){
      return slideshowFactory.nextDogButton(vm.rescueEndIndex,vm.rescueDogsLength);
    };

    vm.nextRescueDogs = function(){
      vm.rescueEndIndex += 5;
    };

    vm.prevRescueDogs = function(){
      vm.rescueEndIndex -= 5;
    };

    vm.editSnapshot = function(){
      $location.path('snapshot/edit');
    }
    });
  })
  .controller('editRescueController',function($location,rescueDetailsFactory){
    var vm = this;
    vm.header = 'Change Rescue Details';

    rescueDetailsFactory.getDetails(function(details){
      vm.user = details;
    });

    vm.addDetails = function(){
      rescueDetailsFactory.editDetails(vm.user,function(){
        $location.path('/snapshot');
      });
    };
  });
})();
