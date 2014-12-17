;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/register',{
      templateUrl: 'views/auth/register.html'
    });
    .when('/login',{
      templateUrl: 'views/auth/login.html'
    });
    .when('/logout',{
      templateUrl: 'views/auth/logout.html'
    });
  });
})();
