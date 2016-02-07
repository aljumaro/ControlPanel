'use strict';

describe('Service: Maestros', function () {

  // load the service's module
  beforeEach(module('toDoApp'));

  // instantiate service
  var Maestros;
  beforeEach(inject(function (_Maestros_) {
    Maestros = _Maestros_;
  }));

  it('should do something', function () {
    expect(!!Maestros).toBe(true);
  });

});
