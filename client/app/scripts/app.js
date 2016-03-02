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
          controllerAs: 'vm',
          authenticate: false
        })
        .state('register', {
          url: '/register',
          templateUrl: 'views/register.html',
          controller: 'RegisterCtrl',
          controllerAs: 'vm',
          authenticate: false
        })
        .state('lockscreen', {
          url: '/lockscreen',
          templateUrl: 'views/lockscreen.html',
          controller: 'LockscreenCtrl',
          controllerAs: 'vm',
          authenticate: false
        })
        .state('base', {
          abstract: true,
          templateUrl: 'views/base.html',
          controller: 'BaseCtrl',
          controllerAs: 'basevm',
          authenticate: true
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
          },
          authenticate: true
        })
        .state('base.dashboard', {
          url: '/dashboard',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl',
          controllerAs: 'vm',
          authenticate: true
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
    }
  ]).run(function($confirmModalDefaults, $rootScope, $state, AuthService) {
    $confirmModalDefaults.templateUrl = 'views/templates/confirm.html';
    $confirmModalDefaults.title = 'Confirm action';
    $confirmModalDefaults.ok = 'Continue';
    $confirmModalDefaults.cancel = 'Cancel';

    $rootScope.$on('$stateChangeStart', function(event, toState) {
      AuthService.isLoggedIn()
        .then(function(resolved) {
          if (!resolved && toState.authenticate) {
            event.preventDefault();
            $state.go('login');
          }
        });
    });
  });