'use strict';

/**
 * @ngdoc filter
 * @name toDoApp.filter:priorityFilter
 * @function
 * @description
 * # priorityFilter
 * Filter in the toDoApp.
 */
angular.module('toDoApp')
	.filter('priorityFilter', ['TODO_PRIORITY', function(todoPriority) {
		return function(input) {

			for (var i = 0; i < todoPriority.length; i++) {
				if (todoPriority[i].code === input) {
					return todoPriority[i].description;
				}
			}

			return 'Unknown';
		};
	}]);