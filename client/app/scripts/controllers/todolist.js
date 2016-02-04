'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('TodosCtrl', ['$scope', 'toDoFactory', 'TODO_STATUS', '$uibModal', 'TODO_PRIORITY', 'TODO_PROJECT', '$rootScope',
		function($scope, toDoFactory, todoStatus, $uibModal, todoPriority, todoProject, $ro) {

		function init() {
			$scope.statusList = todoStatus;
			$scope.showFilter = false;
			$scope.priorityList = todoPriority;
			$scope.projectList = todoProject;
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
		      resolve: {
		        todo: function () {
		          return todo;
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

		init();

	}])
	.controller('EditTodoCtrl', ['$scope', '$uibModalInstance', 'todo', 'TODO_STATUS', 'TODO_PRIORITY', 'TODO_PROJECT',
		function($scope, $uibModalInstance, todo, todoStatus, todoPriority, todoProject){

		$scope.modalTitle = (todo.title) ? 'Edit ' + todo.title : 'New To Do';
		$scope.todo = todo;
		$scope.statusList = todoStatus;
		$scope.priorityList = todoPriority;
		$scope.projectList = todoProject;

		$scope.ok = function() {
			$uibModalInstance.close(todo);
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss('cancel');
		};
	}]);