'use strict';

describe('Controller: DeploymentsCtrl', function () {

  // load the controller's module
  beforeEach(module('toDoApp'));

  var DeploymentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeploymentsCtrl = $controller('DeploymentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DeploymentsCtrl.awesomeThings.length).toBe(3);
  });
});
