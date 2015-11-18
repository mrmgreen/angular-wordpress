'use strict';

fdescribe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));
  beforeEach(module('myApp.config'));

  var httpBackend,
    scope,
    jsonResponse = { title: 'first page'},
    jsonResponse1 = { title: 'second page'},
    myConfig;

  beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http, _myConfig_) {
    scope = $rootScope.$new();
    myConfig = _myConfig_;
    httpBackend = $httpBackend;
    //$httpBackend.whenGET(myConfig.wordpressPages).respond(jsonResponse);
    $httpBackend.whenGET(/(wp-json\/wp\/v2\/posts$)/).respond(jsonResponse);
    $controller('View1Ctrl as view1', {
      $scope: scope,
      $http: $http
    });
  }));

  it('myConfig constant myconfig.wordpressPages', function() {
    expect(myConfig.wordpressPages).toBeDefined();
  });

  it('myConfig constant myconfig.wordpressPosts', function() {
    expect(myConfig.wordpressPosts).toBeDefined();
  });

  it('mock httpbackend test view1 homepage promise', inject(function($httpBackend) {
    $httpBackend.whenGET(myConfig.wordpressPages).respond(jsonResponse);
    httpBackend.flush();
    expect(scope.view1.homepage).toEqual(jasmine.objectContaining({ title: 'first page' }));
  }));

  it('using regex for httpbackend', inject(function($httpBackend) {
    $httpBackend.whenGET(/(wp-json\/wp\/v2\/pages$)/).respond(jsonResponse1);
    httpBackend.flush();
    expect(scope.view1.homepage).toEqual(jasmine.objectContaining({ title: 'second page' }));
  }));

});