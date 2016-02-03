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
	.filter('statusFilter', ['TODO_STATUS', function(todoStatus) {
		return function(input) {

			for (var i = 0; i < todoStatus.length; i++) {
				if (todoStatus[i].code === input) {
					return todoStatus[i].description;
				}
			}

			return 'Unknown';
		};
	}]);