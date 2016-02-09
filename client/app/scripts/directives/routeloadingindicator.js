'use strict';

/**
 * @ngdoc directive
 * @name toDoApp.directive:RouteLoadingIndicator
 * @description
 * # RouteLoadingIndicator
 */
angular.module('toDoApp')
  .directive('routeLoadingIndicator', ['$rootScope', function ($rootScope) {
    return {
      template: "<h1 ng-if='isRouteLoading'>Loading...<i class='fa fa-circle-o-notch fa-spin'></i></h1>",
      restrict: 'E',
      link: function(scope, elem, attrs) {
	      scope.isRouteLoading = false;
	 
	      scope.$on('$routeChangeStart', function() {
	        scope.isRouteLoading = true;
	      });

	      scope.$on('$routeChangeSuccess', function() {
	        scope.isRouteLoading = false;
	      });
	    }
    };
  }]);
