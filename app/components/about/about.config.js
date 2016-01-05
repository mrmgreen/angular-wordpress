(function() {
	'use strict',

	angular.module('myApp.about')

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/about', {
				controller: 'aboutCtrl',
				controllerAs: 'vm',
				templateUrl: 'components/about/about.html'
			})
	}]);


})();