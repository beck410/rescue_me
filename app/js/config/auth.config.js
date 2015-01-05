;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/register',{
      templateUrl: 'views/auth/register.html',
      controller: 'registerController',
      controllerAs: 'details'
    })
    .when('/login',{
      templateUrl: 'views/auth/login.html',
      controller: 'loginController',
      controllerAs: 'login'
    })
    .when('/logout',{
      template: '',
      controller: 'logoutController',
      controllerAs: 'logout',
      needLogin: true
    })
    .when('/changepassword',{
      templateUrl: 'views/auth/changepassword.html',
      controller: 'changePasswordController',
      controllerAs: 'changepw',
      needLogin: true
    });
  })
  .run(function($rootScope,$location){
    if(!$rootScope.user){
      $location.path('/landing');
    }
  })
  .run(function($rootScope,checkAccessFactory){
    $rootScope.$on('$routeChangeStart', function(event,nextRoute){
      if(nextRoute.$$route && nextRoute.$$route.needLogin){
        checkAccessFactory.requireLogin();
      }
    });
  });
})();
