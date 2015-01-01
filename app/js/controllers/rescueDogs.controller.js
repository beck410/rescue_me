;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('rescueDogsController',function(removeDogFactory,dogListFactory,$location){
    var vm = this;
    vm.dogGroup = 'rescue-dogs';
    vm.dogHeader = 'Rescue Dogs';
    vm.removeButton = true;

    dogListFactory.getDogList('rescueDogs',function(rescueDogs){
      vm.dogs = rescueDogs;
    });

    vm.removeDog = function(dog){
      removeDogFactory.removeDog('rescueDogs',dog,function(rescueDog){
        delete vm.dogs[rescueDog];
      });
    };

    vm.addNewDog = function(){
      $location.path('/rescue-dogs/add')
    }
  })
  .controller('showRescueController', function(dogDetailsFactory, $routeParams,$location){
    var vm = this;
    var id = $routeParams.id;
    dogDetailsFactory.getDogDetails('rescueDogs',id,function(rescueDog){
      vm.dog = rescueDog;
    });

    vm.editDogDetails = function(){
     $location.path('/rescue-dogs/' + id + '/edit');
    };
  })
  .controller('moveRescueDog',function(moveDogFactory, dogDetailsFactory,$routeParams,$location){
    var vm = this;
    var id = $routeParams.id;

    dogDetailsFactory.getDogDetails('potentialDogs',id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      moveDogFactory.addDogToList('rescueDogs','potentialDogs',id,vm.dog,function(){
        $location.path('/rescue-dogs/');
      });
    };
  })
  .controller('editRescueDog',function(editDogFactory,dogDetailsFactory,$routeParams,$location){
    var vm = this;
    var id = $routeParams.id;

    dogDetailsFactory.getDogDetails('rescueDogs',id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      editDogFactory.editDog('rescueDogs',id,vm.dog,function(){
        $location.path('rescue-dogs/');
      });
    };

  })
  .controller('addRescueDog',function(addNewDogFactory,$location){
    var vm = this;
    vm.submitDogDetails = function(){
      addNewDogFactory.addDog(vm.dog,'rescueDogs',function(dog){
        vm.dogs = vm.dogs || {};
        console.log(vm.dogs);
        vm.dogs[dog.name] = vm.dog;
        vm.dog = {};
        $location.path('/rescue-dogs');
      });
    };
  });
})();
