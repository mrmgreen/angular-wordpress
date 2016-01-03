(function() {
  'use strict',

	angular.module('myApp.journeyplanner')

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	    .when('/journeyplanner', {
	      controller: 'journeyPlanner',
	      templateUrl: 'components/journeyplanner/journeyplanner.html',
	      controllerAs: 'journeyplanner'
	    })
	}]);

})();

