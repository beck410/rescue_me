;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/rescue-dogs',{
      templateUrl: 'views/dog-list.html',
      controller: 'rescueDogsController',
      controllerAs: 'dogList'
    })
    .when('/rescue-dogs/:id',{
      templateUrl: 'views/dog-details.html',
      controller: 'showRescueController',
      controllerAs: 'dogDetails'
    })
    .when('/rescue-dogs/:id/add',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'addRescueDog',
      controllerAs: 'dogList'
    })
    .when('/rescue-dogs/:id/edit',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'editPotentialDog',
      controllerAs: 'dogList'
    });
  });
})();
