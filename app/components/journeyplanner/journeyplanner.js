angular.module('myApp.journeyplanner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/journeyplanner', {
      controller: 'journeyPlanner',
      templateUrl: 'journeyplanner/journeyplanner.html',
      controllerAs: 'journeyplanner'
    })
}])

.controller('journeyPlanner',['journeyPlannerFact', 'querySearch', '$scope', '$log', function(journeyPlannerFact, querySearch, $scope, $log) {
    var self = this;
    this.journey = journeyPlannerFact.journey;
    this.fromStopPoint;
    this.destinations = {
      from: {name: '', icsId: ''},
      to: {name: '', icsId: ''},
    };
    this.master = {};
    this.promiseJourney = '';
    this.showhidelistFrom = 'show';
    this.showhidelistTo = 'show';
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
    this.searchChange = function(input, fromOrTo) {
      querySearch.setQuery(input);
      querySearch.searchQuery().then(function(response) {
        console.log('searchQuery', response.data);
        if (fromOrTo === 'from') { 
        self.fromStopPoint = response.data;
        console.log('fromStopPoint', self.fromStopPoint);
        self.showhidelistFrom = 'show';
      } else if (fromOrTo === 'to') {
        self.toStopPoint = response.data;
        self.showhidelistTo = 'show';
      }
      }, function(response) {
        console.log('error with searchQuery', reponse.data);
      });
      console.log('change is guna come', input);
    }

    // from input options clicked
    this.journeyFromOptionsClick = function(input) {
      console.log('testme now', input);
      self.destinations.from.name = input.name;
      self.destinations.from.icsId = input.icsId;
      self.showhidelistFrom = 'hide';
    }
    // to input options clicked
    this.journeyToOptionsClick = function(input) {
      console.log('testme now', input);
      self.destinations.to.name = input.name;
      self.destinations.to.icsId = input.icsId;
      self.showhidelistTo = 'hide';
    }
}])

.directive('myCustomer', function() {
  return {
    template: 'Name {{  journeyplanner.customer.name }}'
  };
})

.factory('querySearch', ['$http', function($http) {
  return {
    from: this.from,
    setQuery: function(data) {
      this.from = data.name;
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
        console.log('setJourney this.journey', this.journey);
      },
      getJourney: function () {
        return this.journey
      },
      promiseJourneyFeed: function() {
        return $http.get('https://api.tfl.gov.uk/journey/journeyresults/' + this.journey.from.icsId + '/to/' + this.journey.to.icsId);
      }
    }
}]);


