'use strict';

angular.module('myApp.view3', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/view3', {
          templateUrl: 'view3/view3.html',
          controller: 'view3Ctrl',
          controllerAs: 'view3Tfl'
        })
  }])

  .factory('view3Tfl', ['$http', function($http) {

    return {
      message: 'somebody stop me!',

      tfl : function() {
        return $http.get('https://api.tfl.gov.uk/line/mode/tube/status');
      }
    }
  }])

  .controller('view3Ctrl', ['view3Tfl', function(view3Tfl) {

    var self = this;
    this.message = 'helloo monkey';
    this.viewMsg = view3Tfl.message;

      view3Tfl.tfl().then(function(response) {
        self.tfl = response.data;
      },
        function(data) {
        console.log(data);
      })

    }]);



//  .controller('view3Ctrl', view3Ctrl)
//
//  .factory('tfl', tfl);
//
//function view3Ctrl() {}
//
//function tfl() {}
