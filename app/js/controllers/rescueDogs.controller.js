;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('rescueDogsController',function(removeDogFactory,dogListFactory,$location){
    var vm = this;
    vm.dogGroup = 'rescue-dogs';
    vm.dogHeader = 'Rescue Dogs';
    vm.configButtons = true;

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
  .controller('showRescueController', function(dogDetailsFactory, $routeParams,$location,completeDogDetails){
    var vm = this;
    var id = $routeParams.id;
    vm.ownNotes = true;
    vm.foster = true;

    dogDetailsFactory.getDogDetails('rescueDogs',id,function(rescueDog){
      var completeRescueDog = completeDogDetails.fillEmptyDetails(rescueDog)
      console.log(completeRescueDog)
      vm.dog = completeRescueDog;
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
  .controller('addRescueDog',function(rescuedDogsCounter,addNewDogFactory,$location){
    var vm = this;
    vm.dogGroup = 'rescue-dogs';
    vm.rescueDog = true;

    vm.submitDogDetails = function(){
      addNewDogFactory.addDog(vm.dog,'rescueDogs',function(dog){
        rescuedDogsCounter.updateCounter();
        vm.dogs = vm.dogs || {};
        vm.dogs[dog.name] = vm.dog;
        vm.dog = {};
        $location.path('/rescue-dogs');
      });
    };
  });
})();
