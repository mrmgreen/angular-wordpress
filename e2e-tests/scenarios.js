'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /terminaltext when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/terminaltext");
  });


  describe('terminaltext', function() {

    beforeEach(function() {
      browser.get('index.html#/terminaltext');
    });


    it('should render terminaltext when user navigates to /terminaltext', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('posts', function() {

    beforeEach(function() {
      browser.get('index.html#/posts');
    });


    it('should render posts when user navigates to /posts', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
