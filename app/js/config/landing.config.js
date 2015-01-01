;(function(){
  'use strict';
angular.module('rescue_me')
.config(function($routeProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'views/landing.html'
    })
   .otherwise({
      redirectTo:'/snapshot'
    });
  });
})();
