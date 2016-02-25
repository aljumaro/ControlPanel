'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
  .controller('BaseCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
