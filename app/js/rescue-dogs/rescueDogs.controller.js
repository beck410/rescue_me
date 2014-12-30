;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('rescueDogsController',function(rescueFactory,dogListFactory){
    var vm = this;
    dogListFactory.getDogList('rescueDogs',function(rescueDogs){
      vm.dogs = rescueDogs;
    });

    vm.removeDog = function(dog){
      rescueFactory.removeDog(dog,function(rescueDog){
        delete vm.rescueDogs[rescueDog];
      });
    };
  })
  .controller('showRescueController', function(rescueFactory, $routeParams){
    var vm = this;
    var dog = $routeParams.id;
    rescueFactory.getDogDetails(dog, function(rescueDog){
      vm.dog = rescueDog;
    });
  });
})();
