'use strict';

/**
 * @ngdoc directive
 * @name toDoApp.directive:cpICheck
 * @description
 * # cpICheck
 */
angular.module('toDoApp')
  .directive('cpICheck', function () {
    return {
      restrict: 'C',
      link: function postLink(scope, element) {
        $(element).iCheck({
          checkboxClass: 'icheckbox_flat-orange',
          radioClass: 'iradio_flat-orange'
        });
      }
    };
  });
