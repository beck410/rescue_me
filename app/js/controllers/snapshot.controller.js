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
      vm.potentialDogs = dogs;
      vm.potentialDogsLength = (_.size(dogs));
    });

    dogListFactory.getDogList('rescueDogs',function(dogs){
      vm.rescueDogs = dogs;
      vm.rescueDogsLength = (_.size(dogs));
    });
  });
})();
