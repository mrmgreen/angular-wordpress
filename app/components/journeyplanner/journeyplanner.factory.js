(function() {
  'use strict',

angular.module('myApp.journeyplanner')

  .factory('journeyPlannerFact', ['$http', function($http) {

      return {
        promiseJourneyFeed: function(destinations) {
          return $http.get('https://api.tfl.gov.uk/journey/journeyresults/' + destinations.from.icsId + '/to/' + destinations.to.icsId);
        }
      }
  }]);

})();

