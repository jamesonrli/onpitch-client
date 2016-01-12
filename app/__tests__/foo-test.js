jest.dontMock('../foo.js');

describe('foo', function() {
  it('Simple add', function() {
    var foo = require('../foo.js');

    expect(foo(1, 2)).toBe(3);
  });
});
