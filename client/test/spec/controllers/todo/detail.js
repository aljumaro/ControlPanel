'use strict';

describe('Controller: TodoDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('toDoApp'));

  var TodoDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TodoDetailCtrl = $controller('TodoDetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TodoDetailCtrl.awesomeThings.length).toBe(3);
  });
});
