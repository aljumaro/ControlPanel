'use strict';

describe('Filter: priorityFilter', function () {

  // load the filter's module
  beforeEach(module('toDoApp'));

  // initialize a new instance of the filter before each test
  var priorityFilter;
  beforeEach(inject(function ($filter) {
    priorityFilter = $filter('priorityFilter');
  }));

  it('should return the input prefixed with "priorityFilter filter:"', function () {
    var text = 'angularjs';
    expect(priorityFilter(text)).toBe('priorityFilter filter: ' + text);
  });

});
