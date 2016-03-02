'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:BaseCtrl
 * @description
 * # BaseCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
    .controller('BaseCtrl', ['AuthService', '$state', function(AuthService, $state) {
        var vm = this;

        vm.logout = function() {
            AuthService.logout()
                .then(function() {
                    $state.go('login');
                });
        };

        vm.user = AuthService.getUser();
    }]);
