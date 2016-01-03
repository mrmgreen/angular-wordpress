'use strict';

angular.module('myApp.tubestatuses', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/tubestatuses', {
          templateUrl: 'components/tubestatuses/tubestatuses.html',
          controller: 'tubestatusesCtrl',
          controllerAs: 'tubestatusesTfl'
        })
  }])

  .factory('tubestatusesTfl', ['$http', function($http) {

    return {
      message: 'somebody stop me!',

      tfl : function() {
        return $http.get('https://api.tfl.gov.uk/line/mode/tube/status', {
          params: {
            api_id: '1a3ffbd2',
            api_key: '2adfb02001adfefa068f7a74862854e6'
          }
        });
      }
    }
  }])

  .controller('tubestatusesCtrl', ['tubestatusesTfl', function(tubestatusesTfl) {

    var self = this;
    this.message = 'helloo monkey';
    this.viewMsg = tubestatusesTfl.message;

      tubestatusesTfl.tfl().then(function(response) {
        self.tfl = response.data;
      },
        function(data) {
        console.log(data);
      })

    }]);



//  .controller('tubestatusesCtrl', tubestatusesCtrl)
//
//  .factory('tfl', tfl);
//
//function tubestatusesCtrl() {}
//
//function tfl() {}
