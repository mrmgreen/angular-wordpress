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

.factory('terminalText', ['$q', '$interval', '$timeout', '$rootScope', function($q, $interval, $timeout, $rootScope) {
 
  var delay = 2000;
  var iterator;
  var blinkLetters;
  var blinkLettersClass;
  var terminalText1;
  var animationText;

    /**
     * Animates the blink text
     * @param class containing the text to animate.
     * $scope.$emits terminalTextFinish after function finishes.
     */
  function setBlinky(text) { 

    blinkLettersClass = document.querySelector(text);
    blinkLetters = blinkLettersClass.innerHTML;
    animationText = document.querySelector('.animationText');
    blinkLettersClass.innerHTML = '<span class="terminalText1"></span><span class="blink">&#x7c;</span>';

    var blinkPipe = document.querySelector('.blink');

    var blink = $interval( function() { if (blinkPipe.style.opacity == 0 || blinkPipe.style.opacity == '' ) { blinkPipe.style.opacity = 1 } else {blinkPipe.style.opacity = 0 }}, 600);

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
     * Sets callback to animateBlink function
     */
     function setCallBackTimeOut(delay) {
      $timeout(function() {
        terminalText1 = document.querySelector('.terminalText1');
        animationText.style.position = 'absolute';
        animationText.style.top = '50%';
        animationText.style.left = '50%';
        terminalText1.className += ' centerTextAfterAnim';
        blinkPipe.parentNode.removeChild(blinkPipe);
        $rootScope.$broadcast('terminalTextFinish');
      }, delay);
     }

    /**
     * Iterators the setTimeout for animation.
     */
     function setTheTimeout(iterator, delay) {
      $timeout(function() {
          document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0, iterator);
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

.controller('View1Ctrl', ['view1Fact', 'terminalText', '$scope', '$timeout', function(view1Fact, terminalText, $scope, $timeout) {
    var self = this;
    this.message = "Take the blue pill";
    this.newMessage = view1Fact.newMessage;
    this.terminalText = terminalText.terminal('.terminal');
    view1Fact.pages().then(function(response) {
      self.homepage = response.data;
    }, function(reason) {
      console.log('view1Fact controller not working ', reason);
    });
    $scope.$on('terminalTextFinish', function() {
      console.log('broadcast has worked');
      $timeout(function () {
        $scope.setHomeBtn = true;
      }, 2000);
    });

}]);