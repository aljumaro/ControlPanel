'use strict';

describe('Filter: projectfilter', function () {

  // load the filter's module
  beforeEach(module('toDoApp'));

  // initialize a new instance of the filter before each test
  var projectfilter;
  beforeEach(inject(function ($filter) {
    projectfilter = $filter('projectfilter');
  }));

  it('should return the input prefixed with "projectfilter filter:"', function () {
    var text = 'angularjs';
    expect(projectfilter(text)).toBe('projectfilter filter: ' + text);
  });

});
