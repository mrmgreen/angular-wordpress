angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/view5', {
      controller: 'journeyPlanner',
      templateUrl: 'view5/view5.html',
      controllerAs: 'view5'
    })
}])

.controller('journeyPlanner',['journeyPlannerFact', '$scope', function(journeyPlannerFact, $scope) {
    var self = this;
    this.journey = journeyPlannerFact.journey;
    this.destinations = {
      from: '',
      to: ''
    };
    this.master = {};
    this.promiseJourney = '';
    this.update = function(destinations) {
      self.master = angular.copy(destinations);
      journeyPlannerFact.setJourney(self.master);
      journeyPlannerFact.promiseJourneyFeed().then(function(response) {
        self.promiseJourney = response.data;
        console.log('journePlannerbulls', response.data);
      }, function(response) {
        console.log('error with journey', reponse.data);
      });
    };
    this.customer = {
      name: 'Derek'
    }
    this.setDestinationFrom = function(destinations) {
     console.log('response', destinations );
     self.destinations.from = destinations;
     console.log('self destinations', self.destinations);
     }
    this.setDestinationTo = function(destinations) {
     console.log('response', destinations );
     self.destinations.to = destinations;
     console.log('self destinations', self.destinations);
     }
  }])

.directive('myCustomer', function() {
  return {
    template: 'Name {{  view5.customer.name }}'
  };
})

.factory('journeyPlannerFact', ['$http', function($http) {

    return {
      journey: this.journey,
      setJourney: function (data) {
        this.journey = data;
      },
      getJourney: function () {
        return this.journey
      },
      promiseJourneyFeed: function() {
        return $http.get('https://api.tfl.gov.uk/journey/journeyresults/' + this.journey.from + '/to/' + this.journey.to);
      }
    }
}]);


