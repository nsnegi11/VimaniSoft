angular.module('authService', [])

	.factory('auth', function($http,authToken, $q) {

		var authFactory = {};
		authFactory.login= function(username, pwd)	{
			return $http.post('/api/authenticate', {
				username : username,
				password : pwd
			}).success(function(data){
				authToken.setToken(data.token);
				return data;
			})
		};
		authFactory.logout = function() {
			authToken.setToken();
		};
		authFactory.isLogin = function() {
			if(authToken.getToken())
				return true;
			else
				return false;
		};
		authFactory.getUser = function() {
			if(authToken.getToken())
				return $http.get('/api/me',{cache: false});
			else
				return $q.reject({message : 'user has no token'});
		};
		authFactory.registerUser = function(userData) {
			return $http.post('/api/users', {
				firstName : userData.firstName,
				middleName : userData.middleName,
			  lastName : userData.lastName,
			  username : userData.username,
			  password : userData.password
			}).success(function(data){
					return data;
			});
		};

		return authFactory;
	})
	.factory('authToken',function($window) {
		var authTokenFactory = {};
		authTokenFactory.setToken = function(token) {
			if(token)
				$window.localStorage.setItem('token', token);
			else
				$window.localStorage.removeItem('token');
		};
		authTokenFactory.getToken = function() {
			return $window.localStorage.getItem('token');
		};
		return authTokenFactory;
	})
 	// factory
	.factory('interscept',function(authToken,$q,$location) {
		var intersceptFactory = {};
		intersceptFactory.request = function(config) {
			var token = authToken.getToken();
			if(token)
				config.headers['x-access-token'] = token;
			return config;
		};
		intersceptFactory.responseError = function() {
			if (response.status == 403) {
	 			AuthToken.setToken();
	 			$location.path('/contact');
	 		}
			return $q.reject({message : 'responseError'});
		}
		return intersceptFactory;
	})
// angular.module('authService')
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('interscept');
  });
