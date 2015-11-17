'use strict';

fdescribe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  var httpBackend,
    scope,
    jsonResponse = { title: 'first page' };

    beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      $httpBackend.whenGET('http://localhost:8888/angular/angular-wordpress/1/wordpress/wp-json/wp/v2/pages').respond(jsonResponse);
      $controller('View1Ctrl as view1', {
        $scope: scope,
        $http: $http
      });
    }));

  it('should return page titles', function() {
    httpBackend.flush();
    expect(scope.view1.homepage).toEqual(jasmine.objectContaining({ title: 'first page' }));
  });

});