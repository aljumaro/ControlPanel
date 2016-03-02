'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('RegisterCtrl', ['$state', 'AuthService', 'Notification', function($state, AuthService, Notification) {
		var vm = this;
		vm.rf = {};

		vm.register = function() {

			console.log(vm.rf.username, vm.rf.password1, vm.rf.password2, vm.rf.email);

			if (validate(vm.rf)) {

				var user = {
					username: vm.rf.username,
					password: vm.rf.password1,
					email: vm.rf.email
				};

				AuthService.register(user)
					.then(function() {
						$state.go('login');
						Notification.success({
							message: 'User registered. Please, log in.'
						});
						vm.rf = {};
					}, function() {
						Notification.error({
							message: 'Error registering user'
						});
					});
			}
		};

		function validate(rf) {
			if (rf.password1 !== rf.password2) {
				Notification.error({
					message: 'Password must be equal'
				});

				return false;
			}

			return true;
		}

	}]);