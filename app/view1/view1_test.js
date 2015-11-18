'use strict';

fdescribe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));
  beforeEach(module('myApp.config'));

  var httpBackend,
    scope,
    jsonResponse = { title: 'first page'},
    myConfig;

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http, _myConfig_) {
      scope = $rootScope.$new();
      myConfig = _myConfig_;
      httpBackend = $httpBackend;
      $httpBackend.whenGET(myConfig.wordpressPages).respond(jsonResponse);
      $controller('View1Ctrl as view1', {
        $scope: scope,
        $http: $http
      });
    }));

  it('test myConfig constant', function() {
    expect(myConfig.wordpressPages).toBeDefined();
  });

  it('should return page titles', function() {
    httpBackend.flush();
    expect(scope.view1.homepage).toEqual(jasmine.objectContaining({ title: 'first page' }));
  });

});