'use strict';

fdescribe('aboutCtrl returns pages', function() {

  beforeEach(function() {
    module('myApp.about');
    module('myApp.config');
  });

  module(function($provide) {
    $provide.factory('pages', ['$q', function($q) {
      function pages() {
        if (passPromise) {
          return $q.when();
        } else {
          return $q.reject();
        }
      }
      return {
        pages: pages
      }

    }]);
  });

  var aboutCtrl, mockPages, myConfig, http, httpBackend, jsonResponse = { title: 'first page'};

  beforeEach(inject(function ($controller, pages, _myConfig_, $http, $httpBackend) {
    mockPages = pages;
    myConfig = _myConfig_;
    httpBackend = $httpBackend;
    httpBackend.whenGET(/(wp-json\/wp\/v2\/pages$)/).respond(jsonResponse);
    spyOn(mockPages, 'pages').and.callThrough();
    aboutCtrl = $controller('aboutCtrl', {
      pages: mockPages,
      $http: http
    });
  }));

  it('aboutCtrl pages message', function() {
    expect(aboutCtrl.message).toEqual('all is good');
  });

  it('pages promise to have been called', function() {
    expect(mockPages.pages).toHaveBeenCalled();
  });

  it('mock httpbackend test pages promise', function() {
    httpBackend.flush();
    expect(aboutCtrl.pages).toEqual(jasmine.objectContaining({ title: 'first page' }));
  });

});