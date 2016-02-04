'use strict';

/**
 * @ngdoc filter
 * @name toDoApp.filter:projectfilter
 * @function
 * @description
 * # projectfilter
 * Filter in the toDoApp.
 */
angular.module('toDoApp')
	.filter('projectfilter', ['TODO_PROJECT', '_', function(todoProject, _) {
		return function(input) {
			
			return _.find(todoProject, function(project) {
				return project.code === input;
			}).description;
		};
	}]);