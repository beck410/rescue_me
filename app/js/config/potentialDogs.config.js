;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/:rescueName/potential-dogs',{
      templateUrl: 'views/dog-list.html',
      controller:'potentialDogsController',
      controllerAs:'dogList',
      needLogin: true
    })
    .when('/:rescueName/potential-dogs/details/:id',{
      templateUrl: 'views/dog-details.html',
      controller: 'showPotentialDogController',
      controllerAs: 'dogDetails',
      needLogin: true
    })
    .when('/:rescueName/potential-dogs/:id/move',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'movePotentialDog',
      controllerAs: 'dogList',
      needLogin: true
    })
    .when('/:rescueName/potential-dogs/:id/edit',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'editPotentialDog',
      controllerAs: 'dogList',
      needLogin: true
    })
    .when('/:rescueName/potential-dogs/add',{
      templateUrl: 'views/dog-details-form.html',
      controller: 'addPotentialDog',
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
