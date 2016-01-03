(function() {
	'use strict';

	angular.module('myApp.starwarsText')

	.controller('starwars', ['bylineAnim', '$scope', '$location', function(byline, $scope, $location) {
		// $scope.test = function() { $location.path('/terminaltext'); }
		// $scope.test();
		$scope.byline;
		$scope.animationEnd = function(){
			function myScript() { 
				console.log('anim is working wahooo!', $location.path());
				$location.path('/terminaltext');
				$scope.$apply();
			}
			document.querySelector('.martin').addEventListener("animationend", myScript);
		}

	}]);

})();