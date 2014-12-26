;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('loginController', function(authFactory, $scope, $location){
    var vm = this;

    vm.login= function(){
      authFactory.login(vm.email, vm.password, function(){
        console.log('login done');
        // $location.path('/snapshot');
        // $scope.$apply();
      });
    };

  })
  .controller('logoutController', function(authFactory){

  })
  .controller('registerController', function(authFactory){

  })
  .controller('changePasswordController', function(authFactory){

  });
})();
