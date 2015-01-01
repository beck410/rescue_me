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
    .when('/rescue-dogs/:id/move',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'moveRescueDog',
      controllerAs: 'dogList'
    })
    .when('/rescue-dogs/:id/edit',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'editRescueDog',
      controllerAs: 'dogList'
    });
  });
})();
