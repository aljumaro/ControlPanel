'use strict';

/**
 * @ngdoc directive
 * @name toDoApp.directive:errSrc
 * @description
 * # errSrc
 */
angular.module('toDoApp')
    .directive('errSrc', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src !== attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        };
    });
