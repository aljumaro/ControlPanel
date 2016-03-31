'use strict';

/**
 * @ngdoc directive
 * @name toDoApp.directive:RouteLoadingIndicator
 * @description
 * # RouteLoadingIndicator
 */
angular.module('toDoApp')
	.directive('routeLoadingIndicator', [function() {
		return {
			templateUrl: 'views/templates/routeloadingindicator.html',
			restrict: 'E',
			link: function(scope) {
				scope.isRouteLoading = false;

				scope.$on('$stateChangeStart',
					function() {
						scope.isRouteLoading = true;
					});

				scope.$on('$stateChangeSuccess',
					function() {
						scope.isRouteLoading = false;
					});
			}
		};
	}]);