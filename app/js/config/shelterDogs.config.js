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
    .when('/find-dogs/details/:id',{
      templateUrl: 'views/dog-details.html',
      controller: 'showShelterController',
      controllerAs: 'dogDetails'
    })
  });
})();
