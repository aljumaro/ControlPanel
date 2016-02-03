'use strict';

describe('Service: toDoFactory', function () {

  // load the service's module
  beforeEach(module('toDoApp'));

  // instantiate service
  var toDoFactory;
  beforeEach(inject(function (_toDoFactory_) {
    toDoFactory = _toDoFactory_;
  }));

  it('should do something', function () {
    expect(!!toDoFactory).toBe(true);
  });

});
