;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/find-dogs',{
      templateUrl: 'views/shelter-dogs/shelter-dogs.html',
      controller: 'shelterDogsController',
      controllerAs: 'shelter'
    })
    .when('/find-dogs/:id',{
      templateUrl: 'views/shelter-dogs/shelter-dog-details.html',
      controller: 'shelterDogsController',
      controllerAs: 'shelter'
    })
  });
})();
