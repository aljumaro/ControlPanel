'use strict';

/**
 * @ngdoc service
 * @name toDoApp.toDoFactory
 * @description
 * # toDoFactory
 * Factory in the toDoApp.
 */
angular.module('toDoApp').factory('toDoFactory', ['$http', function($http) {

  return {
    find: function() {
      return $http.get('/api/todo');
    },

    add: function() {
    	return $http.post('/api/todo', {
			title: 'Titulo todo 1',
			detail: 'Very very long detail Very very long detail Very very long detail',
			url: 'http://www.google.es',
			date: new Date(),
			dateCompleted: new Date(),
			priority: 'LO',
			project: 'ARQFIS - web',
			status: 'OP'
		});
    }
  };
}]);