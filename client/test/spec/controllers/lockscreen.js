'use strict';

describe('Controller: LockscreenCtrl', function () {

  // load the controller's module
  beforeEach(module('toDoApp'));

  var LockscreenCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LockscreenCtrl = $controller('LockscreenCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LockscreenCtrl.awesomeThings.length).toBe(3);
  });
});
