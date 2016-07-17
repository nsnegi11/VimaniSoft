angular.module('registerApp', ['authService'])
  .controller('registerController', function($rootScope, $location, auth, $window) {

    var vm = this;
    // var error = "";
    // vm.processing = "false";

    vm.registerUser = function() {

      if(vm.registerData == undefined) {
        vm.error = "Form Cannot be empty";
        return;
      }
      // console.log("registering");
      var userData = {
        firstName: vm.registerData.firstName,
        middleName: vm.registerData.middleName,
        lastName: vm.registerData.lastName,
        username: vm.registerData.username,
        password: vm.registerData.password,
      }
      auth.registerUser(userData)
          .success(function(data) {
            vm.processing = "true";
            if(data.success)
              $location.path('/pages/login');
            else
              vm.error = data.message;
          });
    }


  });
