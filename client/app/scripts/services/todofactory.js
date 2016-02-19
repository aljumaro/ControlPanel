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

    save: function(todo) {

    	//Si el todo ya tiene id lo editamos con PUT
    	if (todo._id) {
			return $http.put('/api/todo/' + todo._id, todo);
    	} 
    	
    	//Si no tiene id lo guardamos con post
    	todo.date = new Date();
    	return $http.post('/api/todo', todo);
    },

    remove: function(_id){
        return $http.delete('api/todo/' + _id);
    }
  };
}]);