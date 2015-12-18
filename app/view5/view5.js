angular.module('myApp.view5', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/view5', {
      controller: 'journeyPlanner',
      templateUrl: 'view5/view5.html',
      controllerAs: 'view5'
    })
}])

.controller('journeyPlanner',['journeyPlannerFact', 'querySearch', '$scope', '$log', function(journeyPlannerFact, querySearch, $scope, $log) {
    var self = this;
    this.journey = journeyPlannerFact.journey;
    this.fromStopPoint;
    this.destinations = {
      from: '',
      to: ''
    };
    this.master = {};
    this.promiseJourney = '';
    this.showhidelist = 'show';
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

    //Takes from input text and queries tfl api with it.
    this.searchChange = function(input) {
      querySearch.setFrom(input);
      querySearch.searchQuery().then(function(response) {
        console.log('searchQuery', response.data);
        self.fromStopPoint = response.data;
        self.showhidelist = 'show';
        // configuring bootstrap dropdown
      }, function(response) {
        console.log('error with searchQuery', reponse.data);
      });
      console.log('change is guna come', input);
    }

    // from input options clicked
    this.journeyToOptionsClick = function(input) {
      console.log('testme now', input);
      self.destinations.from = input.name;
      self.showhidelist = 'hide';
    }

}])

.directive('myCustomer', function() {
  return {
    template: 'Name {{  view5.customer.name }}'
  };
})

.factory('querySearch', ['$http', function($http) {
  return {
    from: this.from,
    setFrom: function(data) {
      this.from = data;
      console.log('this.from', this.from);
    },
    searchQuery: function() {
      return $http.get("https://api.tfl.gov.uk/StopPoint/search?query=" + this.from + "&modes=tube");
    }
  }
}])

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


