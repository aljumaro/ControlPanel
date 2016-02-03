'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('TodosCtrl', ['$scope', 'toDoFactory', 'TODO_STATUS', function($scope, toDoFactory, todoStatus) {

		$scope.todoStatus = todoStatus;
		$scope.showFilter = false;
		
		toDoFactory.find().then(function(response) {
			$scope.todoList = response.data;
		});

		$scope.toggleFilter = function() {
			$scope.showFilter = !$scope.showFilter;
		}

	}]);