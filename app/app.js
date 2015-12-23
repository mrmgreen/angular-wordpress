'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.config',
  'myApp.navBar',
  'myApp.terminaltext',
  'myApp.posts',
  'myApp.tubestatuses',
  'myApp.journeyplanner',
  'myApp.starwarsText',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/starwars'});
}]);

angular.module('myApp.navBar', ['ui.bootstrap']).controller('navbarCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

// angular.module('myApp.navBar', ['ui.bootstrap'])

// .controller('navbarCtrl', function($scope){
// 	$scope.navbarCollapsed = 'hello';
// });