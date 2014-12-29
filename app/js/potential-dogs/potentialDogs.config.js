;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/potential-dogs',{
      templateUrl: 'views/potential-dogs/potential-dogs.html',
      controller:'potentialDogsController',
      controllerAs:'potential'
    })
    .when('/potential-dogs/:id', {
      templateUrl: 'views/potential-dogs/potential-dog-details.html',
      controller: 'showPotentialDogController',
      controllerAs: 'showPotential'
    })
  })
})();
