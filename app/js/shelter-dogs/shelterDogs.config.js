;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/find-dogs',{
      templateUrl: 'views/dog-list.html',
      controller: 'shelterDogsController',
      controllerAs: 'dogList'
    })
    .when('/find-dogs/:id',{
      templateUrl: 'views/shelter-dogs/shelter-dog-details.html',
      controller: 'showShelterController',
      controllerAs: 'show'
    })
  });
})();
