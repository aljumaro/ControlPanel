'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
    .controller('DashboardCtrl', ['$scope', function($scope) {
    	$scope.$parent.basevm.title = 'Dashboard';
    	$scope.$parent.basevm.activeElement = 'DB';
    }]);
