'use strict';

/**
 * @ngdoc function
 * @name toDoApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the toDoApp
 */
angular.module('toDoApp')
    .controller('ProfileCtrl', ['$scope', 'AuthService', 'Notification', 'Upload',
        function($scope, AuthService, Notification, Upload) {

            $scope.$parent.basevm.title = 'Profile';

            var vm = this;

            vm.user = AuthService.getUser();

            vm.progressPercentage = 0;

            vm.loading = false;

            vm.save = function() {
                AuthService.updateProfile(vm.user)
                    .then(
                        () => {
                            $scope.$parent.basevm.user.profile = angular.copy(vm.user.profile);
                            Notification.success({ message: 'Profile saved.' });
                        },
                        () => Notification.error({ message: 'Profile could not be updated.' })
                    );
            };


            $scope.upload = function(file) {

                console.log('File ', file);
                if (file) {
                    Upload.upload({
                        url: '/api/account/profile/pic/' + vm.user._id,
                        data: { file: file }
                    }).then(function(resp) {
                        console.log('Success ' + resp + 'uploaded. Response: ' + resp.data);
                        $scope.$parent.basevm.picUrl = '/api/account/profile/pic/' + vm.user._id + '?' + new Date().getTime();
                    }, function(resp) {
                        console.log('Error status: ' + resp.status);
                    });
                }
            };

        }
    ]);
