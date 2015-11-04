'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.config',
  'myApp.navBar',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'myApp.view5',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

angular.module('myApp.navBar', ['ui.bootstrap']).controller('navbarCtrl', function ($scope) {
  $scope.isCollapsed = true;
});

// angular.module('myApp.navBar', ['ui.bootstrap'])

// .controller('navbarCtrl', function($scope){
// 	$scope.navbarCollapsed = 'hello';
// });