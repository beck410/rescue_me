;(function(){
  'use strict';
  angular.module('rescue_me')
  .controller('loginController', function($scope, $rootScope, $location,$timeout,loginFactory,$routeParams,rescueName){
    var vm = this;
    
    if($rootScope.user){
      rescueName.getRescueName(function(details){
        $rootScope.rescueName = details.userName;
        vm.rescueName = details.userName;
      });
    }

    vm.login = function(){
      loginFactory.login(vm.email, vm.password, vm.rescueName, function(){
    console.log('login finished');
      $rootScope.rescueName = vm.rescueName;
      });
    };

  })
  .controller('logoutController', function(logoutFactory,$scope,$location){
    logoutFactory.logout(function(){
      $location.path('/');
      $scope.$apply();
    });
  })
  .controller('registerController', function($scope,$location,registerFactory,$timeout){
    var vm = this;
    vm.registration = true;
    vm.header = 'Register';

    vm.addDetails = function(){
      console.log(vm.user);
      registerFactory.register(vm.user,function(rescueName){
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
