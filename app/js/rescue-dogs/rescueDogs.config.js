;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/rescue-dogs',{
      templateUrl: 'views/rescue-dogs/rescue-dogs.html',
      controller: 'rescueDogsController',
      controllerAs: 'rescue'
    })
    .when('/rescue-dogs/:id',{
      templateUrl: 'views/shelter-dogs/shelter-dog-details.html',
      controller: 'showRescueController',
      controllerAs: 'show'
    })
  });
})();
