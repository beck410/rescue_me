;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'views/landing.html'
    })
    .when('/snapshot',{
      templateUrl: 'views/snapshot.html'
    })
    .when('/',{
    })
    .otherwise({
      redirectTo:'/'
    });
  });
})();
