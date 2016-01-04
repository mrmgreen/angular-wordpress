(function() {
'use strict';

angular.module('myApp.starwarsText')

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/starwars', {
	    templateUrl: 'components/starwars-text-anim/starwars.html',
	    controller: 'starwars',
	    controllerAs: 'vm'
	  });
	}]);

})();