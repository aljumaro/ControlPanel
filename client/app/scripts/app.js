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
    'ui.bootstrap',
    'angular-confirm',
    'ui-notification',
    'daterangepicker',
    'angularMoment',
    'nya.bootstrap.select',
    'ui.router'
  ])
  .config(['$urlRouterProvider', '$stateProvider', 'NotificationProvider',
      function($urlRouterProvider, $stateProvider, NotificationProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm'
      })
      .state('lockscreen', {
        url: '/lockscreen',
        templateUrl: 'views/lockscreen.html',
        controller: 'LockscreenCtrl',
        controllerAs: 'vm'
      })
      .state('base', {
        abstract: true,
        templateUrl: 'views/base.html',
        controller: 'BaseCtrl',
        controllerAs: 'basevm'
      })
      .state('base.todo', {
        url: '/todo',
        templateUrl: 'views/todo.html',
        controller: 'TodosCtrl',
        controllerAs: 'vm',
        resolve: {
          todosResolve: ['toDoFactory', function(toDoFactory) {
            return toDoFactory.find();
          }]
        }
      })
      .state('base.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      });

    $urlRouterProvider.otherwise('/dashboard');
     

    NotificationProvider.setOptions({
      startTop: 20,
      startRight: 20,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionY: 'bottom',
      templateUrl: 'views/templates/notification.html'
    });

     /*$httpProvider.interceptors.push(function($timeout) {
       return {
         'response': function(response) {
           return $timeout(function() {
             return response;
           }, 1000);
         }
       };
     });*/
  }]).run(function($confirmModalDefaults) {
    $confirmModalDefaults.templateUrl = 'views/templates/confirm.html';
    $confirmModalDefaults.title = 'Confirm action';
    $confirmModalDefaults.ok = 'Continue';
    $confirmModalDefaults.cancel = 'Cancel';
  });