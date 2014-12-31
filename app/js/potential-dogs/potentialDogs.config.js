;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/potential-dogs',{
      templateUrl: 'views/dog-list.html',
      controller:'potentialDogsController',
      controllerAs:'dogList'
    })
    .when('/potential-dogs/:id', {
      templateUrl: 'views/dog-details.html',
      controller: 'showPotentialDogController',
      controllerAs: 'dogDetails'
    });
  });
})();
