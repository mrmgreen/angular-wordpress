'use strict';

fdescribe('myApp.terminaltext module', function() {

  beforeEach(module('myApp.terminaltext'));
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
    $controller('TerminaltextCtrl as terminaltext', {
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

  it('mock httpbackend test terminaltext homepage promise', inject(function($httpBackend) {
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