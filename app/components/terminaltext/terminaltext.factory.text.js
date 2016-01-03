(function() {
  'use strict';

  angular.module('myApp.terminaltext')
  
  .factory('terminalText', terminaltext);
  terminaltext.$inject = ['$q', '$interval', '$timeout', '$rootScope'];

  function terminaltext($q, $interval, $timeout, $rootScope) {
   
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
  }

})();