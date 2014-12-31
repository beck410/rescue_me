;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('rescueDogsController',function(removeDogFactory,dogListFactory){
    var vm = this;
    vm.dogGroup = 'rescue-dogs';
    vm.dogHeader = 'Rescue Dogs';
    vm.removeButton = true;

    dogListFactory.getDogList('rescueDogs',function(rescueDogs){
      vm.dogs = rescueDogs;
    });

    vm.removeDog = function(dog){
      removeDogFactory.removeDog('rescueDogs',dog,function(rescueDog){
        delete vm.rescueDogs[rescueDog];
      });
    };
  })
  .controller('showRescueController', function(dogDetailsFactory, $routeParams){
    var vm = this;
    var id = $routeParams.id;
    dogDetailsFactory.getDogDetails('rescueDogs',id,function(rescueDog){
      vm.dog = rescueDog;
    });
  });
})();
