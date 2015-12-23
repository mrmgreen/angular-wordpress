angular.module('myApp.journeyplanner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/journeyplanner', {
      controller: 'journeyPlanner',
      templateUrl: 'components/journeyplanner/journeyplanner.html',
      controllerAs: 'journeyplanner'
    })
}])

.controller('journeyPlanner',['journeyPlannerFact', '$scope', '$log', '$http', function(journeyPlannerFact, $scope, $log, $http) {
 
/* typeahead */
/* returns location from query input */
  $scope.getLocation = function(val) {
    return $http.get('https://api.tfl.gov.uk/StopPoint/search', {
      params: {
        query: val,
        modes: 'tube'
      }
    }).then(function(response){
      return response.data.matches.map(function(item){
        console.log('there async', item.name);
        return item.name;
      });
    });
  };
  //typeahead end

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
    
    /* directive customer name */
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


