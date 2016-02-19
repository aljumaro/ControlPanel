'use strict';

describe('Filter: todoFilter', function () {

  // load the filter's module
  beforeEach(module('toDoApp'));

  // initialize a new instance of the filter before each test
  var todoFilter;
  beforeEach(inject(function ($filter) {
    todoFilter = $filter('todoFilter');
  }));

  it('should return the input prefixed with "todoFilter filter:"', function () {
    var text = 'angularjs';
    expect(todoFilter(text)).toBe('todoFilter filter: ' + text);
  });

});
