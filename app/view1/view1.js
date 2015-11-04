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

.factory('terminalText', function() {
  
document.querySelector('.terminal').innerHTML = '<span class="blink">hello</span>' + document.querySelector('.terminal').innerHTML;

var blinkText = document.querySelector('.blink');

var blink = setInterval(function() {if (blinkText.style.opacity == 0 || blinkText.style.opacity == '') { blinkText.style.opacity = 1 } else {blinkText.style.opacity = 0 }}, 1000);

  return {
    terminal: 'tet'

  }
})

.controller('View1Ctrl', ['view1Fact', function(view1Fact) {
    var self = this;
    this.message = "Take the blue pill";
    this.newMessage = view1Fact.newMessage;
    view1Fact.pages().then(function(response) {
      self.homepage = response.data;
    });

}]);