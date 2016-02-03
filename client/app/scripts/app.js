'use strict';

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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .when('/todo', {
        templateUrl: 'views/todolist.html',
        controller: 'TodosCtrl',
        controllerAs: 'todos'
      })
      .when('/todo/detail/:idTodo', {
        templateUrl: 'views/tododetail.html',
        controller: 'TodoDetailCtrl',
        controllerAs: 'todo/detail'
      })
      .when('/todo/add', {
        templateUrl: 'views/tododetail.html',
        controller: 'TodoDetailCtrl',
        controllerAs: 'todo/detail'
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
  });
