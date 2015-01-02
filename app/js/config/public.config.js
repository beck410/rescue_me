;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'views/landing.html'
    })
    .when('/snapshot',{
      templateUrl: 'views/snapshot.html',
      controller: 'snapshotController',
      controllerAs: 'snapshot',
      needLogin: true
    })
    .otherwise({
      redirectTo:'/'
    });
  })
  .run(function($rootScope,checkAccessFactory){
    $rootScope.$on('$routeChangeStart', function(event,nextRoute){
      if(nextRoute.$$route && nextRoute.$$route.needLogin){
        checkAccessFactory.requireLogin();
      }
    });
  });
})();

