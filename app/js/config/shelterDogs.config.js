;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/find-dogs',{
      templateUrl: 'views/dog-list.html',
      controller: 'shelterDogsController',
      controllerAs: 'dogList',
      needLogin: true
    })
    .when('/find-dogs/details/:id',{
      templateUrl: 'views/dog-details.html',
      controller: 'showShelterController',
      controllerAs: 'dogDetails',
      needLogin: true
    });
  })
  .run(function($rootScope,$location){
    if(!$rootScope.user){
      $location.path('/login');
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
