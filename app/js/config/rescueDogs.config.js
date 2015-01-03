;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/rescue-dogs',{
      templateUrl: 'views/dog-list.html',
      controller: 'rescueDogsController',
      controllerAs: 'dogList',
      needLogin: true
    })
    .when('/rescue-dogs/details/:id',{
      templateUrl: 'views/dog-details.html',
      controller: 'showRescueController',
      controllerAs: 'dogDetails',
      needLogin: true
    })
    .when('/rescue-dogs/:id/move',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'moveRescueDog',
      controllerAs: 'dogList',
      needLogin: true
    })
    .when('/rescue-dogs/:id/edit',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'editRescueDog',
      controllerAs: 'dogList',
      needLogin: true
    })
    .when('/rescue-dogs/add',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'addRescueDog',
      controllerAs: 'dogList',
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

