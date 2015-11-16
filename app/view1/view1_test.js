'use strict';

fdescribe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));

  describe('view1 controller', function(){

    var view1Ctrl;
    var $scope;

    beforeEach(inject(function($rootScope, $controller) {
      $scope = $rootScope.$new();
      view1Ctrl = $controller('View1Ctrl as view1', { $scope: $scope });
    }));

    it('view1 controller is defined', inject(function($controller) {
      //spec body
      expect(view1Ctrl).toBeDefined();

    }));

    it('view1 message', inject(function ($controller) {
      expect($scope.view1.message).toBe('heasfdf');
    }));

  });
});