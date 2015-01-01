;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('loginController', function($scope, $location,$timeout,loginFactory){
    var vm = this;

    vm.login= function(){
      loginFactory.login(vm.email, vm.password, function(){
        $timeout(function(){
          $location.path('/snapshot');
          $scope.$apply();
        });
      });
    };

  })
  .controller('logoutController', function(){

  })
  .controller('registerController', function($scope,$location,registerFactory){
    var vm = this;
    vm.addUser = function(){

      registerFactory.register(vm.user,function(){
        $location.path('/#/')
        $scope.$apply();
      });
    };

  })
  .controller('changePasswordController', function(){
  });
})();
