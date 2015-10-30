'use strict';

angular.module('myApp.view4', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/view4', {
        templateUrl: 'view4/view4.html',
        controller: 'view4Ctrl',
        controllerAs: 'view4'
      })
  }])

  .factory('tflJourney', ['$http', function($http) {

    return {
      tflJourneyBalhamtoBank : function() {
        return $http.get('https://api.tfl.gov.uk/journey/journeyresults/51.4426,-0.1520/to/51.513347,-0.088986')
      }
    }

  }])

.controller('view4Ctrl', ['tflJourney', function(tflJourney) {

    var self = this;
    this.message = 'hello Bond';

    tflJourney.tflJourneyBalhamtoBank().then(function(response) {
      self.tflJourney = response.data;
    }, function(response) {
      console.log(response.data);
    })

  }]);
