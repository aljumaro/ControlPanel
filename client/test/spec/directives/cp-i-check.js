'use strict';

describe('Directive: cpICheck', function () {

  // load the directive's module
  beforeEach(module('toDoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cp-i-check></cp-i-check>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cpICheck directive');
  }));
});
