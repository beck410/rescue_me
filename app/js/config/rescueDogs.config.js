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
  });
})();