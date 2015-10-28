'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngSanitize',])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'view1'
  });
}])

.factory('view1Fact', ['$http', function($http) {

  return {
    newMessage: 'noooo',

    pages: function() {
      return $http.get('http://localhost:8888/angular/angular-wordpress/1/wordpress/wp-json/wp/v2/pages');
    }

  }
}])

.controller('View1Ctrl', ['view1Fact', function(view1Fact) {
    var self = this;
    this.message = "Take the blue pill";
    this.newMessage = view1Fact.newMessage;
    view1Fact.pages().then(function(response) {
      self.homepage = response.data;
    });

}]);