'use strict';

function filterFunction(todo, filter, moment) {
	var baseDate = moment(todo.date);
	var startDate = filter.daterange.startDate;
	var endDate = filter.daterange.endDate;
	return (
		(filter.title === undefined ||
			todo.title.toUpperCase().indexOf(filter.title.toUpperCase()) > -1) &&
		(filter.url === undefined || filter.url === '' ||
			(todo.url !== undefined && todo.url.toUpperCase().indexOf(filter.url.toUpperCase()) > -1)) &&
		(filter.priority === undefined || filter.priority === null || todo.priority === filter.priority) &&
		(filter.project === undefined || filter.project === null || todo.project === filter.project) &&
		(filter.status === undefined || filter.status === null || todo.status === filter.status) &&
		((startDate === null && endDate === null) || baseDate.isBetween(startDate, endDate))
	);
}

/**
 * @ngdoc function
 * @name toDoApp.controller:TodosCtrl
 * @description
 * # TodosCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
	.controller('TodosCtrl', ['$scope', 'toDoFactory', '$uibModal', 'Maestros', 'todosResolve', 'Notification', 'moment',
		function($scope, toDoFactory, $uibModal, Maestros, todosResolve, Notification, moment) {

			$scope.loading = false;

			function init() {
				$scope.statusList = Maestros.status;
				$scope.priorityList = Maestros.priorities;
				$scope.projectList = Maestros.projects;
				$scope.showFilter = false;
				$scope.todoList = todosResolve.data;
				$scope.todoFilter = {};
				$scope.todoFilter.daterange = {
					startDate: null,
					endDate: null
				};
			}

			function openModal(todo) {
				var modal = $uibModal.open({
					animation: false,
					templateUrl: 'editTodo.html',
					controller: 'EditTodoCtrl',
					scope: $scope,
					resolve: {
						todo: function() {
							return angular.copy(todo);
						}
					}
				});

				modal.result.then(function(todo) {
					$scope.loading = true;
					toDoFactory.save(todo).then(function(response) {
						if (angular.isUndefined(todo._id) || todo._id === null) {
							$scope.todoList.push(response.data.client);
						} else {
							var index = $scope.todoList.findIndex(a => a._id === todo._id);
							$scope.todoList[index] = todo;
						}

						$scope.loading = false;
						Notification.info({
							message: 'To Do saved.'
						});
					}, function() {
						Notification.warning({
							message: 'To Do could not be saved.'
						});
						$scope.loading = false;
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

			$scope.remove = function(_id) {
				$scope.loading = true;
				toDoFactory.remove(_id).then(function() {
					var index = $scope.todoList.findIndex(a => a._id === _id);
					$scope.todoList.splice(index, 1);
					$scope.loading = false;
					Notification.info({
						message: 'To Do deleted.'
					});
				}, function() {
					Notification.warning({
						message: 'To Do could not be deleted.'
					});
					$scope.loading = false;
				});
			};

			$scope.filtroController = function(todo) {
				return filterFunction(todo, $scope.todoFilter, moment);
			};

			init();

		}
	])
	.controller('EditTodoCtrl', ['$scope', '$uibModalInstance', 'todo',
		function($scope, $uibModalInstance, todo) {

			$scope.modalTitle = (todo.title) ? 'Edit ' + todo.title : 'New To Do';

			$scope.todo = todo;
			if (!todo._id) {
				todo.priority = 'MD';
				todo.status = 'OP';
			}

			$scope.submit = function() {
				$uibModalInstance.close(todo);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};
		}
	]);