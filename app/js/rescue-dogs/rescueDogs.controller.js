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
  .controller('showRescueController', function(dogDetailsFactory, $routeParams){
    var vm = this;
    var dog = $routeParams.id;
    dogDetailsFactory.getDogDetails('rescueDogs',dog, function(rescueDog){
      vm.dog = rescueDog;
    });
  });
})();
