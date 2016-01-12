
jest.dontMock('../main');

describe('Main Component', function() {

  describe('Render', function() {
    beforeEach(function() {
      var TestUtils = require('react-addons-test-utils');
      var MainComponent = require('../main');

      var DOM = TestUtils.renderIntoDocument(<MainComponent />);
    });

    it('initially displays the landing page with profile image container and two buttons', function() {
      // profile image container
      var img = TestUtils.scryRenderedDOMComponentsWithTag(DOM, 'img');
      expect(img.length).toBe(1);

      // login and singup buttons
      var buttons = TestUtils.scryRenderedDOMComponentsWithTag(DOM, 'button');
      expect(buttons.length).toBe(2);
    });
  });

});
