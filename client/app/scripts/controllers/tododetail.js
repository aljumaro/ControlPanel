'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:TodoDetailCtrl
 * @description
 * # TodoDetailCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('TodoDetailCtrl', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.idTodo = $routeParams.idTodo;
	}]);