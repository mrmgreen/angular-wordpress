'use strict';

fdescribe('aboutCtrl returns pages', function() {

  beforeEach(module('myApp.about'));

  var scope, $controller;

  beforeEach(inject(function ($rootScope, _$controller_) {
    scope = $rootScope.$new();
    $controller = _$controller_;
  }));

module(function($provide) {
  $provide.factory('pages', ['$q', function($q) {

  }]);
});

  it('aboutCtrl pages variable contains pages', function() {
    var controller = $controller('aboutCtrl', { $scope : scope });
    expect($scope.message).toEqual('all not good');
  });

});

module(function($provide){
  $provide.factory('dataSvc', ['$q', function($q) {
    function save(data){
      if(passPromise){
        return $q.when();
      } else {
        return $q.reject();
      }
    }
    return{
      save: save
    };
  }]);
});