'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('TodosCtrl', ['$scope', 'toDoFactory', '$uibModal', 'Maestros',
		function($scope, toDoFactory, $uibModal, Maestros) {

		function init() {
			$scope.statusList = Maestros.status;
			$scope.priorityList = Maestros.priorities;
			$scope.projectList = Maestros.projects;
			$scope.showFilter = false;
			loadTodos();
		}	

		function loadTodos() {
			toDoFactory.find().then(function(response) {
				$scope.todoList = response.data;
			});	
		}

		function openModal(todo) {
			var modal = $uibModal.open({
		      animation: false,
		      templateUrl: 'editTodo.html',
		      controller: 'EditTodoCtrl',
		      scope: $scope,
		      resolve: {
		        todo: function () {
		          return angular.copy(todo);
		        }
		      }
		    });

		    modal.result.then(function(todo){
		    	toDoFactory.save(todo).then(loadTodos());
		    });
		}

		$scope.toggleFilter = function() {
			$scope.showFilter = !$scope.showFilter;
		};

		$scope.add = function() {
			openModal({});
		};

		$scope.edit = function(todo) {
			openModal(todo);
		};

		$scope.remove = function(_id){
			toDoFactory.remove(_id).then(loadTodos());
		}

		init();

	}])
	.controller('EditTodoCtrl', ['$scope', '$uibModalInstance', 'todo',
		function($scope, $uibModalInstance, todo, todoStatus, todoPriority, todoProject){

		if(!todo._id) {
			todo.priority = 'MD';
			todo.status = 'OP';
		}

		$scope.modalTitle = (todo.title) ? 'Edit ' + todo.title : 'New To Do';
		$scope.todo = todo;

		$scope.ok = function() {
			$uibModalInstance.close(todo);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}]);