;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/snapshot',{
      templateUrl: 'views/snapshot.html',
      controller: 'snapshotController',
      controllerAs: 'snapshot'
    })
  });
})();

