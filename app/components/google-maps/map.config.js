(function() {
'use strict',

angular.module('myApp.map')

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	    .when('/map', {
	      controller: 'maps',
	      templateUrl: 'components/google-maps/map.html',
	      controllerAs: 'vm'
	    })
	}]);

})();