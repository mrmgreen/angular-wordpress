'use strict';

fdescribe('Testing the about controller', function() {

var defferd, $q, controller, $rootScope, pages;

  beforeEach(function() {
    module('myApp.about');
    module('myApp.config');
  });

  beforeEach(inject(function(_$q_, _$rootScope_, $controller, pages) {
    $rootScope = _$rootScope_;
    deferred = _$q_.defer();

    spyOn(pages, 'getPages').and.returnValue(deferred.promise);
    controller = $controller('aboutCtrl');
  }));
  // it('should return message', inject(function($controller) {
  //  $controller('aboutCtrl');
  it('expect message to be all good', function() {
    expect(controller.message).toEqual('all is good');
  });
  it('resolves the pages promise', function() {
    pages.pages
  })

});

// 'use strict';

// var controller;

// fdescribe('about controller', function() {

//   beforeEach(function() {
//     module('myApp.about');
//     module('myApp.config');
//   });

//   beforeEach(inject(function($controller) {
//     controller = $controller('aboutCtrl');
//   }));
//   // it('should return message', inject(function($controller) {
//   //  $controller('aboutCtrl');
//   it('expect message to be all good', function() {
//     expect(controller.message).toEqual('all is good');
//   });

// });


// 'use strict';

// fdescribe('aboutCtrl returns pages', function() {

//   beforeEach(function() {
//     module('myApp.about');
//     module('myApp.config');
//   });

//   module(function($provide) {
//     $provide.factory('pages', ['$q', function($q) {
//       function pages() {
//         if (passPromise) {
//           return $q.when();
//         } else {
//           return $q.reject();
//         }
//       }
//       return {
//         pages: pages
//       }

//     }]);
//   });

//   var aboutCtrl, mockPages, myConfig, http, httpBackend, jsonResponse = { title: 'first page'};

//   beforeEach(inject(function ($controller, pages, _myConfig_, $http, $httpBackend) {
//     mockPages = pages;
//     myConfig = _myConfig_;
//     httpBackend = $httpBackend;
//     httpBackend.whenGET(/(wp-json\/wp\/v2\/pages$)/).respond(jsonResponse);
//     spyOn(mockPages, 'pages').and.callThrough();
//     aboutCtrl = $controller('aboutCtrl', {
//       pages: mockPages,
//       $http: http
//     });
//   }));

//   it('aboutCtrl pages message', function() {
//     expect(aboutCtrl.message).toEqual('all is good');
//   });

//   it('pages promise to have been called', function() {
//     expect(mockPages.pages).toHaveBeenCalled();
//   });

//   it('mock httpbackend test pages promise', function() {
//     httpBackend.flush();
//     expect(aboutCtrl.pages).toEqual(jasmine.objectContaining({ title: 'first page' }));
//   });

// });