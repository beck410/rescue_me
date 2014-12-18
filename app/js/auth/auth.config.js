;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/register',{
      templateUrl: 'views/auth/register.html',
      controller: 'registerController',
      controllerAs: 'register'
    })
    .when('/login',{
      templateUrl: 'views/auth/login.html',
      controller: 'loginController',
      controllerAs: 'login'
    })
    .when('/logout',{
      templateUrl: 'views/auth/logout.html',
      controller: 'logoutController',
      controllerAs: 'logout'
    })
    .when('/changepassword',{
      templateUrl: 'views/auth/changepassword.html',
      controller: 'changePasswordController',
      controllerAs: 'changepw'
    })
  });
})();
