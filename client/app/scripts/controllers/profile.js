'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
    .controller('ProfileCtrl', ['$scope', 'AuthService', function($scope, AuthService) {

    	$scope.$parent.basevm.title = 'Profile';
    	$scope.$parent.basevm.activeElement = 'PF';

    	var vm = this;

    	vm.user = AuthService.getUser();

    }]);
