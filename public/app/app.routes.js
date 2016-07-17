
angular.module('app.routes', ['ngRoute'])

 .config(function($routeProvider, $locationProvider) {

   $routeProvider
     // home page route
    .when('/pages/login', {
       templateUrl : 'app/views/pages/login.html',
       controller : 'mainController',
       controllerAs: 'login'
     })
    .when('/pages/home', {
      templateUrl : 'app/views/pages/home.html',
      controller : 'galleryController',
      controllerAs : 'gallery'
     })
     .when('/pages/register', {
       templateUrl : 'app/views/pages/register.html',
       controller : 'registerController',
       controllerAs: 'register'
     });
     
   // get rid of the hash in the URL
   $locationProvider.html5Mode(true);
  });
