;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('loginController', function($scope, $location,$timeout,loginFactory){
    var vm = this;

    vm.login= function(){
      loginFactory.login(vm.email, vm.password, function(){
      });
    };

  })
  .controller('logoutController', function(logoutFactory,$scope,$location){
    logoutFactory.logout(function(){
      $location.path('/');
      $scope.$apply();
    });
  })
  .controller('registerController', function($scope,$location,registerFactory,$timeout,$routeParams){
    var vm = this;
    vm.registration = true;
    vm.header = 'Register';
    var rescueName = $routeParams.rescueName;

    vm.addDetails = function(){
      console.log(vm.user);
      registerFactory.register(vm.user,function(){
        $timeout(function(){
          $location.path(rescueName + '/snapshot');
          $scope.$apply();
        });
      });
    };

  })
  .controller('changePasswordController', function(){
  });
})();
