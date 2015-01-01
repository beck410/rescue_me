;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('loginController', function(authFactory, $scope, $location,$timeout){
    var vm = this;

    vm.login= function(){
      authFactory.login(vm.email, vm.password, function(){
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
        // $location.path('/#/')
        // $scope.$apply();
      });
    };

  })
  .controller('changePasswordController', function(authFactory){
  });
})();
