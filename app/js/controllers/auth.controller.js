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
  .controller('registerController', function($scope,$location,registerFactory,$timeout){
    var vm = this;
    vm.addUser = function(){
      console.log(vm.user);
      registerFactory.register(vm.user,function(){
        $timeout(function(){
          $location.path('/snapshot');
          $scope.$apply();
        });
      });
    };

  })
  .controller('changePasswordController', function(){
  });
})();
