;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory,dogListFactory, completeDogDetails){
    var vm = this;

    rescueDetailsFactory.getDetails(function(details){
      var completeDetails = completeDogDetails.fillEmptyDetails(details);
      vm.rescueOrg = completeDetails;
    });

    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.potentialDogsArray = dogListFactory.objToArray(dogs);
      vm.potentialDogsLength = (_.size(dogs));
      vm.startIndex = 4;
      vm.endIndex = 4;
    });

    dogListFactory.getDogList('rescueDogs',function(dogs){
      vm.rescueDogs = dogs;
      vm.rescueDogsLength = (_.size(dogs));
    });

    vm.nextDogs = function(){
      vm.endIndex += 4;
    }

    vm.prevDogs = function(){
      vm.endIndex -= 4;
    }
  });
})();
