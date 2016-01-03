(function() {
	'use strict';

	angular.module('myApp.starwarsText')

	.controller('starwars', ['bylineAnim', '$scope', '$location', function(byline, $scope, $location) {
		$scope.byline;
		$scope.animationEnd = animationEnd;
		function animationEnd(){
			function myScript() { 
				console.log('anim is working wahooo!', $location.path());
				$location.path('/terminaltext');
				$scope.$apply();
			}
			document.querySelector('.martin').addEventListener("animationend", myScript);
		}

	}]);

})();