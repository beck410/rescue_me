(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory,dogListFactory, completeDogDetails,slideshowFactory,objToArrayFactory,rescuedDogsCounter,$location,$window,$rootScope,$modal,$scope,$routeParams){


    var vm = this;
    vm.rescueName = $routeParams.rescueName;

    rescuedDogsCounter.getCounter(function(count){
      vm.dogsRescued = count;
    });

    rescueDetailsFactory.getDetails(function(details){
      var completeDetails = completeDogDetails.fillEmptyDetails(details);
      vm.rescueOrg = completeDetails;
    });

    //POTENTIAL DOGS
    dogListFactory.getDogList('potentialDogs',vm.rescueName,function(dogs){
      vm.potentialDogsArray = objToArrayFactory.objToArray(dogs);
      vm.currentPotentialDogPage = 0;
      vm.potentialDogPageSize = 2;

        vm.potentialOpen = function(index){
          if(vm.currentpotentialDogPage > 0){
            index += 5 * vm.currentRescueDogPage;
          }

          var modalInstance = $modal.open({
            templateUrl:'views/largeDogPic.html',
            controller: 'snapshotModalsCtrl',
            controllerAs: 'modal',
            size: 'lg',
            scope: $scope,
            backdrop: false,
            windowTemplateUrl: 'views/window.html',
            resolve: {
              dog: function(){
                return vm.potentialDogsArray[index];
              }
            }
          });
        };



      vm.hidePotentialPrevArrow = function(){
        return vm.currentPotentialDogPage === 0 ? true : false;
      };

      vm.hidePotentialNextArrow =function(){
        return vm.currentPotentialDogPage >= vm.potentialDogsArray.length/vm.potentialDogPageSize-1 ? true : false;
      };

      vm.nextPotentialDogs = function(){
        vm.currentPotentialDogPage += 1;
      };

      vm.prevPotentialDogs = function(){
        vm.currentPotentialDogPage -= 1;
      };

      vm.editSnapshot = function(){
        $location.path(vm.rescueName + '/snapshot/edit');
      };

    });

    //RESCUE DOGS
    vm.currentRescueDogPage = 0;
    vm.rescueDogPageSize = 5;
    dogListFactory.getDogList('rescueDogs',vm.rescueName,function(dogs){
      vm.rescueDogsArray = objToArrayFactory.objToArray(dogs);
      console.log(vm.rescueDogsArray);

      vm.open = function(index){
        if(vm.currentRescueDogPage > 0){
          index += 5 * vm.currentRescueDogPage;
        }

        console.log(index);

        var modalInstance = $modal.open({
          templateUrl:'views/largeDogPic.html',
          controller: 'snapshotModalsCtrl',
          controllerAs: 'modal',
          size: 'lg',
          scope: $scope,
          backdrop: false,
          windowTemplateUrl: 'views/window.html',
          resolve: {
            dog: function(){
              return vm.rescueDogsArray[index];
            }
          }
        });
      };

      vm.hidePrevArrow = function(){
         return vm.currentRescueDogPage === 0 ? true : false;
      };

      vm.hideNextArrow =function(){
        return vm.currentRescueDogPage >= vm.rescueDogsArray.length/vm.rescueDogPageSize-1 ? true : false;
      };

      vm.nextRescueDogs = function(){
        vm.currentRescueDogPage += 1;
      };

      vm.prevRescueDogs = function(){
        vm.currentRescueDogPage -= 1;
      };
    });

  })
  .controller('editRescueController',function($location,rescueDetailsFactory,$routeParams){
    var vm = this;
    vm.rescueName = $routeParams.rescueName;
    vm.header = 'Change Rescue Details';

    rescueDetailsFactory.getDetails(function(details){
      vm.user = details;
    });

    vm.addDetails = function(){
      rescueDetailsFactory.editDetails(vm.user,vm.rescueName,function(){
        $location.path(vm.rescueName + '/snapshot');
      });
    };
  })
  .controller('snapshotModalsCtrl',function($modalInstance,dog){
    var vm = this;
    vm.dog = dog;
    console.log('dog',dog);

    vm.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  });
})();
