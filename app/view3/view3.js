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
      tfl : function() {
        return $http.jsonp('https://api.tfl.gov.uk/line/mode/tube/status', {
          params:
        });
      }
    }
    }])

  .controller('view3Ctrl', ['view3Tfl', function(view3Tfl) {
    this.message = 'helloo monkey';
      var self = this;
      view3Tfl.tfl().then(function(response) {
        self.tfl = response.data;
      })
    }]);



//  .controller('view3Ctrl', view3Ctrl)
//
//  .factory('tfl', tfl);
//
//function view3Ctrl() {}
//
//function tfl() {}
