'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('LoginCtrl',['$state', 'AuthService', 'Notification', function($state, AuthService, Notification) {
		var vm = this;
		vm.lf = {};

		vm.login = function(){

			AuthService.login(vm.lf.username, vm.lf.password)
				.then(function() {
					$state.go('base.dashboard');
					vm.lf = {};
				}, function() {
					Notification.error({
						message: 'Invalid username/password'
					});
				});
		};

	}]);