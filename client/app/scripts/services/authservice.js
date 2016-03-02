'use strict';

/**
 * @ngdoc service
 * @name toDoApp.AuthService
 * @description
 * # AuthService
 * Service in the toDoApp.
 */
angular.module('toDoApp')
	.service('AuthService', ['$http', '$q', function($http, $q) {
		var apiUrl = '/api/account';
		var user;
		var email;

		function isLoggedIn() {
			var deferred = $q.defer();
			$http.get(apiUrl + '/status')
				.then(function(response) {
					user = response.data.logged;
					deferred.resolve(user);
				}, function() {
					user = false;
					deferred.resolve(user);
				});
			return deferred.promise;
		}

		function getUser() {
			return user;
		}

		function login(username, password) {

			email = username;

			var deferred = $q.defer();

			$http.post(apiUrl + '/login', {
					username: username,
					password: password
				})
				.success(function(data) {
					user = data.user;
					deferred.resolve();
				})
				.error(function() {
					user = {};
					deferred.reject();
				});

			return deferred.promise;
		}

		function logout() {
			var deferred = $q.defer();

			$http.get(apiUrl + '/logout')
				.success(function() {
					user = {};
					deferred.resolve();
				})
				.error(function() {
					user = {};
					deferred.reject();
				});

			return deferred.promise;
		}

		function register(user) {
			var deferred = $q.defer();

			$http.post(apiUrl + '/register', user)
				.success(function(data, status) {
					if (status === 200) {
						deferred.resolve();
					} else {
						deferred.reject();
					}
				})
				.error(function() {
					deferred.reject();
				});

			return deferred.promise;
		}

		return ({
			isLoggedIn: isLoggedIn,
			getUser: getUser,
			login: login,
			logout: logout,
			register: register
		});
	}]);