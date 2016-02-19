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
	.filter('priorityFilter', ['TODO_PRIORITY', '_', function(todoPriority, _) {
		return function(input) {

			return _.find(todoPriority, function(priority){
				return priority.code === input;
			}).description;

		};
	}]);