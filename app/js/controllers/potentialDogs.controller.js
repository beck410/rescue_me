;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('potentialDogsController',function(dogListFactory,removeDogFactory,moveDogFactory,$location){
    var vm = this;
    vm.dogGroup = 'potential-dogs';
    vm.dogHeader = 'Potential Dogs';
    vm.nextDogGroup = 'Rescue';
    vm.removeButton = true;

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
  .controller('showPotentialDogController', function(dogDetailsFactory, $routeParams,$location){
    var vm = this;
    var dog = $routeParams.id;

    dogDetailsFactory.getDogDetails('potentialDogs',dog,function(potentialDog){
      vm.dog = potentialDog;
    });

    vm.editDogDetails = function(){
      $location.path('/potential-dogs/' + dog + '/edit');
    };

  })
  .controller('movePotentialDog',function(moveDogFactory,dogDetailsFactory,$routeParams,$location){
    var vm = this;
    var id = $routeParams.id;

    dogDetailsFactory.getDogDetails('shelterDogs',id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      moveDogFactory.addDogToList('potentialDogs','shelterDogs',id,vm.dog,function(){
        $location.path('/potential-dogs/');
      });
    };
  })
  .controller('editPotentialDog',function(editDogFactory,dogDetailsFactory,$routeParams,$location){
    var vm = this;
    var id = $routeParams.id;

    dogDetailsFactory.getDogDetails('potentialDogs',id,function(dogDetails){
      vm.dog = dogDetails;
    });

    vm.submitDogDetails = function(){
      editDogFactory.editDog('potentialDogs',id,vm.dog,function(){
        $location.path('potential-dogs/');
      });
    };
  });
})();
