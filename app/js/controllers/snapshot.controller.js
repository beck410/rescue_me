;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory,dogListFactory){
    var vm = this;

    rescueDetailsFactory.getDetails(function(details){
      vm.rescueOrg = details;
    });

    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.potentialDogsLength = (_.size(dogs));
    });

    dogListFactory.getDogList('rescueDogs',function(dogs){
      vm.rescueDogs = dogs;
      console.log(vm.rescueDogs)
    });
  });
})();
