'use strict';

/**
 * @ngdoc service
 * @name toDoApp.Maestros
 * @description
 * # Maestros
 * Factory in the toDoApp.
 */
angular.module('toDoApp')
  .factory('Maestros',  [ 'TODO_STATUS', 'TODO_PRIORITY', 'TODO_PROJECT',  
  		function (Status, Priority, Projects) {

    // Public API here
    return {
      status: Status,
      priorities: Priority,
      projects: Projects
    };
  }]);
