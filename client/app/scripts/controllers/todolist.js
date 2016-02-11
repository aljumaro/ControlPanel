'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('TodosCtrl', ['$scope', 'toDoFactory', '$uibModal', 'Maestros', 'todosResolve', '$timeout',
		function($scope, toDoFactory, $uibModal, Maestros, todosResolve, $timeout) {

		$scope.loading = false;

		function init() {
			$scope.statusList = Maestros.status;
			$scope.priorityList = Maestros.priorities;
			$scope.projectList = Maestros.projects;
			$scope.showFilter = false;

			$scope.todoList = todosResolve.data;
		}	

		function loadTodos() {
			$scope.loading = true;
			toDoFactory.find().then(function(response) {
				console.log('finding');
				for (var i = 0; i < response.data.length; i++) {
					console.log(response.data[i]);
				}
				$scope.todoList = response.data;
				$scope.loading = false;
			}, function(error){
				console.log(error);
				$scope.loading = false;
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
		    	console.log('saving: ');
		    	console.log(todo);
		    	toDoFactory.save(todo).then(function(){
		    		//FIXME: Problema de carga recupera antes la lista con el elemento viejo
		    		$timeout(loadTodos(), 100);
		    	});
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
		};

		init();

	}])
	.controller('EditTodoCtrl', ['$scope', '$uibModalInstance', 'todo',
		function($scope, $uibModalInstance, todo){

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