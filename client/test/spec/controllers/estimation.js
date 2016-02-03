'use strict';

describe('Controller: EstimationCtrl', function () {

  // load the controller's module
  beforeEach(module('toDoApp'));

  var EstimationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EstimationCtrl = $controller('EstimationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EstimationCtrl.awesomeThings.length).toBe(3);
  });
});
