;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('rescueDogsController',function(rescueFactory){
    var vm = this;
    rescueFactory.getRescueDogs(function(dogs){
      vm.rescueDogs = dogs;
    });

    vm.removeDog = function(dog){
      rescueFactory.removeDog(dog,function(rescueDog){
        delete vm.rescueDogs[rescueDog];
      })
    }
  })
  .controller('showRescueController', function(rescueFactory, $routeParams){
    var vm = this;
    var dog = $routeParams.id;
    rescueFactory.getDogDetails(dog, function(rescueDog){
      vm.dog = rescueDog;
    });
  });
})();
