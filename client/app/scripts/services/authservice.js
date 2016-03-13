'use strict';

/**
 * @ngdoc service
 * @name toDoApp.AuthService
 * @description
 * # AuthService
 * Service in the toDoApp.
 */
angular.module('toDoApp')
    .service('AuthService', ['$http', '$q', '$window', function($http, $q, $window) {
        var apiUrl = '/api/account';

        function isLoggedIn() {
            var deferred = $q.defer();
            $http.get(apiUrl + '/status')
                .then(function() {
                    deferred.resolve(true);
                }, function() {
                    deferred.resolve(false);
                });
            return deferred.promise;
        }

        function getUser() {
            return JSON.parse($window.sessionStorage.getItem('user'));
        }

        function setUser(user) {
            $window.sessionStorage.setItem('user', JSON.stringify(user));
        }

        function removeUser() {
            $window.sessionStorage.removeItem('user');
        }

        function login(username, password) {

            var deferred = $q.defer();

            $http.post(apiUrl + '/login', {
                    username: username,
                    password: password
                })
                .success(function(response) {
                    setUser(response.user);
                    deferred.resolve();
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            $http.get(apiUrl + '/logout')
                .success(function() {
                    removeUser();
                    deferred.resolve();
                })
                .error(function() {
                    removeUser();
                    deferred.reject();
                });

            return deferred.promise;
        }

        function register(user) {
            var deferred = $q.defer();

            $http.post(apiUrl + '/register', user)
                .success(function(data, status) {
                    if (status === 200) {
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                })
                .error(function() {
                    deferred.reject();
                });

            return deferred.promise;
        }

        function updateProfile(user) {
            var deferred = $q.defer();

            $http.put(apiUrl + '/profile/' + user._id, user.profile)
                .success(function(data) {
                    deferred.resolve(data);
                    setUser(user);
                })
                .error(function(err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return ({
            isLoggedIn: isLoggedIn,
            getUser: getUser,
            login: login,
            logout: logout,
            register: register,
            updateProfile: updateProfile
        });
    }]);
