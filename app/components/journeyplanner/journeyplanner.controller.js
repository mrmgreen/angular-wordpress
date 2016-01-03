(function() {
  'use strict',

  angular.module('myApp.journeyplanner')

  .controller('journeyPlanner',['journeyPlannerFact', '$scope', '$log', '$http', function(journeyPlannerFact, $scope, $log, $http) {
   
  $scope.person = 'Mikey';
  $scope.getLocation = getLocation;
  this.update = update;
  var self = this;
  this.destinations;
  this.promiseJourney = '';

  /* directive customer name */
  this.customer = {
    name: 'Eric Cantona'
  }

  /* tabs */
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];
       
  /* typeahead */
  /* returns location from query input */

      function getLocation(val) {
      return $http.get('https://api.tfl.gov.uk/StopPoint/search', {
        params: {
          query: val,
          modes: 'tube'
        }
      }).then(function(response){
        return response.data.matches.map(function(item){
          console.log('there async', item);
          return item;
        });
      });
    };

    //typeahead end

      function update() {
        console.log('destinations', this.destinations);
        journeyPlannerFact.promiseJourneyFeed(this.destinations).then(function(response) {
          self.promiseJourney = response.data;
        }, function(response) {
          console.log('error with journey', reponse.data);
        });
      };

  }])

})();

