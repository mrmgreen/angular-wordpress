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

.factory('terminalText', ['$q', function($q) {
 
  var delay = 2000;
  var iterator;

  function setBlinky(text) { 

    var blinkLetters = document.querySelector(text).innerHTML;

    console.log(blinkLetters);

    document.querySelector(text).innerHTML = '<span class="terminalText1"></span><span class="blink">&#x7c;</span>';

    var blinkText = document.querySelector('.blink');

    var blink = setInterval( function() { if (blinkText.style.opacity == 0 || blinkText.style.opacity == '' ) { blinkText.style.opacity = 1 } else {blinkText.style.opacity = 0 }}, 600);

    /**
     * Animates through the string. Sets the setTimeout function.
     */

     function animateBlink() {
      for (var i = 1; i <= blinkLetters.length+1; i++) {
        if( i == blinkLetters.length + 1 ) {
          delay = delay + 1000;
          setCallBackTimeOut(delay); 
        } else {
        delay = delay + 500;
        setTheTimeout(i,delay);
        }
      }
     }

    /**
     * Sets callback to animeBlink function
     */
     function setCallBackTimeOut(delay) {
      var defer;
      setTimeout(function() {
        document.querySelector('.terminalText1').style.color = 'pink';
        document.querySelector('.terminalText1').style.position = 'absolute';
        document.querySelector('.terminalText1').style.top = '50%';
        document.querySelector('.terminalText1').style.left = '50%';
        document.querySelector('.terminalText1').style.fontSize = '40px';
      }, delay);
     }

    /**
     * Iterators the setTimeout for animation.
     */
     function setTheTimeout(iterator, delay) {
        setTimeout(function() {
          document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0,iterator);
        }, delay);
     }

     animateBlink();

  }

  return {
    terminal: function(text) {
      setBlinky(text)
    }

  }
}])

.controller('View1Ctrl', ['view1Fact', 'terminalText', function(view1Fact, terminalText) {
    var self = this;
    this.message = "Take the blue pill";
    this.newMessage = view1Fact.newMessage;
    this.terminalText = terminalText.terminal('.terminal');
    view1Fact.pages().then(function(response) {
      self.homepage = response.data;
    }, function(reason) {
      console.log('view1Fact controller not working ', reason);
    });

}]);