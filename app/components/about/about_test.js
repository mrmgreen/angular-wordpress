'use strict';

fdescribe('Testing the about controller', () => {

let $q, vm, $rootScope, pages, mockPages, setPromise, defer, promise,
 response = { data: { pageId: 1, Title: 'page1' }};

  beforeEach(() => {
    module('myApp.about');
    module('myApp.config');
    module(($provide) => {
      $provide.factory('pages', ['$q', ($q) => {
        setPromise = true;
        defer = $q.defer();
        promise = defer.promise;
        function getPages() {
          if(setPromise) {
            defer.resolve(response);
          } else {
            defer.reject('bad');
          }
          return defer.promise;
        }
        return {
          getPages: getPages
        }
      }]);
    });
  });

  beforeEach(inject((_$q_, _$rootScope_, $controller, pages) => {
    $rootScope = _$rootScope_;
    mockPages = pages;
    spyOn(mockPages, 'getPages').and.callThrough();
    vm = $controller('aboutCtrl', {
      pages: mockPages
    });
  }));

  it('expect message to be all good', () => {
    expect(vm.message).toEqual('all is good');
  });

  it('mockPages to have been called', () => {
    $rootScope.$digest();
    expect(mockPages.getPages).toHaveBeenCalled();
  });

  it('resolve the pages promise', () => {
    $rootScope.$digest();
    expect(vm.pages).toBe(response.data);
  });

});

fdescribe('Testing the about controller promise rejected', () => {

let $q, vm, $rootScope, pages, mockPages, setPromise, defer, promise,
 response = { data: { pageId: 1, Title: 'page1' }};

  beforeEach(() => {
    module('myApp.about');
    module('myApp.config');
    module(($provide) => {
      $provide.factory('pages', ['$q', ($q) => {
        setPromise = false;
        defer = $q.defer();
        promise = defer.promise;
        function getPages() {
          if(setPromise) {
            defer.resolve(response);
          } else {
            defer.reject('bad');
          }
          return defer.promise;
        }
        return {
          getPages: getPages
        }
      }]);
    });
  });

  beforeEach(inject((_$q_, _$rootScope_, $controller, pages) => {
    $rootScope = _$rootScope_;
    mockPages = pages;
    spyOn(mockPages, 'getPages').and.callThrough();
    vm = $controller('aboutCtrl', {
      pages: mockPages
    });
  }));

  it('mockPages to have been called', () => {
    $rootScope.$digest();
    expect(mockPages.getPages).toHaveBeenCalled();
  });

  it('resolve the pages promise', () => {
    $rootScope.$digest();
    expect(vm.error).toBe('getPages has thrown an error');
  });

});

fdescribe('Testing the pages factory', () => {

  let vm, mockPages, myConfig, http, httpBackend, jsonResponse = { title: 'first page'};

  beforeEach(() => {
    module('myApp.about');
    module('myApp.config');
  });

  beforeEach(inject(($controller, pages, _myConfig_, $http, $httpBackend) => {
    mockPages = pages;
    myConfig = _myConfig_;
    httpBackend = $httpBackend;
    httpBackend.whenGET(/(wp-json\/wp\/v2\/pages$)/).respond(jsonResponse);
    spyOn(mockPages, 'getPages').and.callThrough();
    vm = $controller('aboutCtrl', {
      pages: mockPages,
      $http: http
    });
  }));

  it('aboutCtrl pages message', () => {
    expect(vm.message).toEqual('all is good');
  });

  it('pages promise to have been called', () => {
    expect(mockPages.getPages).toHaveBeenCalled();
  });

  it('mock httpbackend test pages promise', () => {
    httpBackend.flush();
    expect(vm.pages).toEqual(jasmine.objectContaining({ title: 'first page' }));
  });

});