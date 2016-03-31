'use strict';

describe('Directive: cpAdminlteActivate', function () {

  // load the directive's module
  beforeEach(module('toDoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cp-adminlte-activate></cp-adminlte-activate>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the cpAdminlteActivate directive');
  }));
});
