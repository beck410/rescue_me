;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('snapshotController',function(rescueDetailsFactory,dogListFactory){
    var vm = this;

    rescueDetailsFactory.getDetails(function(details){
      vm.rescue = details;
    });

    dogListFactory.getDogList('potentialDogs',function(dogs){
      vm.potentialDogsLength = (_.size(dogs));
    })
  });
})();
