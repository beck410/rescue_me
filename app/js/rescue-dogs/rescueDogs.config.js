;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/rescue-dogs',{
      templateUrl: 'views/dog-list.html',
      controller: 'rescueDogsController',
      controllerAs: 'DogList'
    })
    .when('/rescue-dogs/:id',{
      templateUrl: 'views/shelter-dogs/shelter-dog-details.html',
      controller: 'showRescueController',
      controllerAs: 'show'
    })
  });
})();
