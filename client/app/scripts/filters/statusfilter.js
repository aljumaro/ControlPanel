'use strict';

/**
 * @ngdoc filter
 * @name toDoApp.filter:statusFilter
 * @function
 * @description
 * # statusFilter
 * Filter in the toDoApp.
 */
angular.module('toDoApp')
	.filter('statusFilter', ['TODO_STATUS', '_', function(todoStatus, _) {
		return function(input) {

			return _.find(todoStatus, function(status) {
				return status.code === input;
			}).description;

		};
	}]);