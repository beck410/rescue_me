;(function(){
  'use strict';
  angular.module('rescue_me')
  .config(function($routeProvider){
    $routeProvider
    .when('/',{
      templateUrl: 'views/landing.html'
    })
    .when('/:rescueName/snapshot',{
      templateUrl: 'views/snapshot.html',
      controller: 'snapshotController',
      controllerAs: 'snapshot',
      smallHeader: true
    })
    .when('/:rescueName/snapshot/edit',{
      templateUrl: 'views/auth/register.html',
      controller: 'editRescueController',
      controllerAs: 'details',
      needLogin: true
    })
    .otherwise({
      redirectTo:'/'
    });
  })
  .run(function($rootScope,checkAccessFactory){
    $rootScope.$on('$routeChangeStart', function(event,nextRoute){
      if(nextRoute.$$route && nextRoute.$$route.needLogin || nextRoute.$$route && nextRoute.$$route.smallHeader){
        $('.main-header').css('background','url("../images/header-img-2.png")');
        $('.main-header').css('height','200px');
        $('.nav-main').css('padding-top','160px');
        $('.nav-main').css('padding-left','40px');
      }
      if(nextRoute.$$route && nextRoute.$$route.needLogin){
        checkAccessFactory.requireLogin();
      } else {
        $('.main-header').css('background','url("../images/header-img.png")');
        $('.main-header').css('height','550px');
        $('.nav-main').css('padding-top','200px');
        $('.nav-main').css('padding-left','55px');
      }
    });
  });
})();

