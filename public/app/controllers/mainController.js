angular.module('userApp', ['authService', 'app.routes', 'registerApp'])
  .controller('mainController', function($rootScope, $location, auth, $window) {

    var vm = this;
    var error = "";
    vm.loggedIn = auth.isLogin();

    if(!vm.loggedIn) {
      //$location.path('/login');
     if($window.location.pathname != "/pages/login" && $window.location.pathname != "/pages/register")
        $window.location.href = '/pages/login';
    }

    $rootScope.$on('$routeChangeStart', function() {
     if(auth.isLogin()) {
       vm.loggedIn = true;
         auth.getUser().success(function(data) {
         vm.user = data;
       });
     }
     else
      vm.loggedIn = false;
    });

    // function to handle login form
    vm.doLogin = function() {
     vm.processing = true;
     auth.login(vm.loginData.username, vm.loginData.password)
      .success(function(data) {
    	    vm.processing = false;
    	    if(data.success) {
            $location.path('/pages/home');
          }
          else
            vm.error = data.message;
       });
    };
    // function to handle logging out
    vm.doLogout = function() {
     auth.logout();
     vm.user = {};
     $location.path('pages/login');
    };

  });
