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
 
  function setBlinky() { 

    var blinkLetters = document.querySelector('.terminal').innerHTML;

    document.querySelector('.terminal').innerHTML = '<span class="terminalText1"></span><span class="blink">&#x7c;</span>';

    var blinkText = document.querySelector('.blink');

    var blink = setInterval( function() { if (blinkText.style.opacity == 0 || blinkText.style.opacity == '' ) { blinkText.style.opacity = 1 } else {blinkText.style.opacity = 0 }}, 600);

    /**
     * Animates through the string.
     */
    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,1);
    }, 3000);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,2);
    }, 3500);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,3);
    }, 4000);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,4);
    }, 4500);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,5);
    }, 5000);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,6);
    }, 6500);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,7);
    }, 7000);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,8);
    }, 8000);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,9);
    }, 8500);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,10);
    }, 9000);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,11);
    }, 9500);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,12);
    }, 10000);

    setTimeout(function(){ 
      document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,13);
    }, 10500);

  }

  return {
    terminal: setBlinky

  }
})

.controller('View1Ctrl', ['view1Fact', 'terminalText', function(view1Fact, terminalText) {
    var self = this;
    this.message = "Take the blue pill";
    this.newMessage = view1Fact.newMessage;
    this.terminalText = terminalText.terminal();
    view1Fact.pages().then(function(response) {
      self.homepage = response.data;
    });

}]);