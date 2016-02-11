'use strict';

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});

/**
 * @ngdoc overview
 * @name toDoApp
 * @description
 * # toDoApp
 *
 * Main module of the application.
 */
angular
  .module('toDoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'underscore',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/todo', {
        templateUrl: 'views/todolist.html',
        controller: 'TodosCtrl',
        controllerAs: 'todos',
        resolve: {
          todosResolve: ['toDoFactory', function(toDoFactory){
            return toDoFactory.find();
          }]
        }
      })
      .when('/deployments', {
        templateUrl: 'views/deployments.html',
        controller: 'DeploymentsCtrl',
        controllerAs: 'deployments'
      })
      .when('/estimation', {
        templateUrl: 'views/estimation.html',
        controller: 'EstimationCtrl',
        controllerAs: 'estimation'
      })
      .when('/calendar', {
        templateUrl: 'views/calendar.html',
        controller: 'CalendarCtrl',
        controllerAs: 'calendar'
      })
      .when('/configuration', {
        templateUrl: 'views/configuration.html',
        controller: 'ConfigurationCtrl',
        controllerAs: 'configuration'
      })
      .otherwise({
        redirectTo: '/'
      });

   /* $httpProvider.interceptors.push(function($timeout) {
      return {
        "response": function(response) {
          return $timeout(function() {
            return response;
          }, 2500);
        }
      };
    });*/
  }]);