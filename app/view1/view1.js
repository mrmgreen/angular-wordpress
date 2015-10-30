'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngSanitize', 'myApp.config'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'view1'
  });
}])

.factory('view1Fact', ['$http', 'myConfig', function($http, myConfig) {

  return {
    newMessage: 'noooo',

    pages: function() {
      return $http.get(myConfig.wordpressPages);
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