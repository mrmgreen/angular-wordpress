(function() {
  'use strict',

	angular.module('myApp.journeyplanner')

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	    .when('/journeyplanner', {
	      controller: 'journeyPlanner',
	      templateUrl: 'components/journeyplanner/journeyplanner.html',
	      controllerAs: 'journeyplanner'
	    })
	}]);

})();


(function() {
  'use strict',

  angular.module('myApp.journeyplanner')

  .controller('journeyPlanner',['journeyPlannerFact', '$scope', '$log', '$http', function(journeyPlannerFact, $scope, $log, $http) {
   
  $scope.person = 'Mikey';
  $scope.getLocation = getLocation;
  this.update = update;
  var self = this;
  this.destinations;
  this.promiseJourney = '';

  /* directive customer name */
  this.customer = {
    name: 'Eric Cantona'
  }

  /* tabs */
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' },
    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];
       
  /* typeahead */
  /* returns location from query input */

      function getLocation(val) {
      return $http.get('https://api.tfl.gov.uk/StopPoint/search', {
        params: {
          query: val,
          modes: 'tube'
        }
      }).then(function(response){
        return response.data.matches.map(function(item){
          console.log('there async', item);
          return item;
        });
      });
    };

    //typeahead end

      function update() {
        console.log('destinations', this.destinations);
        journeyPlannerFact.promiseJourneyFeed(this.destinations).then(function(response) {
          self.promiseJourney = response.data;
        }, function(response) {
          console.log('error with journey', reponse.data);
        });
      };

  }])

})();


(function() {
  'use strict',

  angular.module('myApp.journeyplanner')

  .directive('myCustomer', function() {
    return {
      template: 'Name {{  journeyplanner.customer.name }}'
    };
  });

})();


(function() {
  'use strict',

angular.module('myApp.journeyplanner')

  .factory('journeyPlannerFact', ['$http', function($http) {

      return {
        promiseJourneyFeed: function(destinations) {
          return $http.get('https://api.tfl.gov.uk/journey/journeyresults/' + destinations.from.icsId + '/to/' + destinations.to.icsId);
        }
      }
  }]);

})();


(function() {
  'use strict';

  angular.module('myApp.posts')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/posts', {
      templateUrl: 'components/posts/posts.html',
      controller: 'postsCtrl',
      controllerAs: 'posts'
    });
  }])

})();
(function() {
	'use strict',

	angular.module('myApp.posts')
	.controller('postsCtrl', postsCtrl);

  function postsCtrl(posts){
    this.howdy = 'message me could yal to';
    var self = this;
    posts.posts().then(function(response) {
      self.posts = response.data;
    }, function(data) {
      console.log(data);
    });
  }
})();
(function() {
  'use strict';

  angular.module('myApp.posts')

  .factory('posts', ['$http', 'myConfig', function($http, myConfig ) {

    return {

      posts: function() {
        return $http.get(myConfig.wordpressPosts);
      }

    }
  }]);

})();
(function() {
'use strict';

angular.module('myApp.starwarsText')

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/starwars', {
	    templateUrl: 'components/starwars-text-anim/starwars.html',
	    controller: 'starwars',
	    controllerAs: 'starwarsText'
	  });
	}]);

})();
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
(function() {
'use strict';

angular.module('myApp.starwarsText')

	.service('bylineAnim', function(){ 

		/*
			The following JS takes in the byline and splits it into letters, each one wrapped in a span. We need to create the spans as nodes, we can't just add them to the HTML using innerHTML, as to do so would mean the CSS won't affect the span because it doesn't recognise the tag as existing. It's an old problem we run into time and again.
		*/

			var byline = document.getElementById('byline');  	// Find the H2
			var bylineText = byline.innerHTML;										// Get the content of the H2
			var bylineArr = bylineText.split('');									// Split content into array
			byline.innerHTML = '';														// Empty current content

			var span;					// Create variables to create elements
			var letter;

			for(var i=0;i<bylineArr.length;i++){									// Loop for every letter
			  span = document.createElement("span");					// Create a <span> element
			  letter = document.createTextNode(bylineArr[i]);	// Create the letter
			  if(bylineArr[i] == ' ') {												// If the letter is a space...
			    byline.appendChild(letter);					// ...Add the space without a span
			  } else {
					span.appendChild(letter);						// Add the letter to the span
			  	byline.appendChild(span); 					// Add the span to the h2
			  }
			}

	});

})();
(function() {
  'use strict';

  angular.module('myApp.terminaltext')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/terminaltext', {
      templateUrl: 'components/terminaltext/terminaltext.html',
      controller: 'TerminalTextCtrl',
      controllerAs: 'terminaltext'
    });
  }]);
  
})();
(function() {
  'use strict';

  angular.module('myApp.terminaltext')

  .controller('TerminalTextCtrl', ['view1Fact', 'terminalText', '$scope', '$timeout', function(view1Fact, terminalText, $scope, $timeout) {
      var self = this;
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
      this.peekBtnClick = function() {
        
      }

  }]);

})();
(function() {
  'use strict';

  angular.module('myApp.terminaltext')
  
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

})();
(function() {
  'use strict';

  angular.module('myApp.terminaltext')

  .factory('view1Fact', ['$http', 'myConfig', function($http, myConfig) {

    return {
      newMessage: 'noooo',

      pages: function() {
        return $http.get(myConfig.wordpressPages);
      }

    }
  }]);

})();
(function() {
'use strict';

angular.module('myApp.tubestatuses')

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/tubestatuses', {
          templateUrl: 'components/tubestatuses/tubestatuses.html',
          controller: 'tubestatusesCtrl',
          controllerAs: 'tubestatusesTfl'
        })
  }]);

})();

(function() {
'use strict';

angular.module('myApp.tubestatuses')

  .controller('tubestatusesCtrl', ['tubestatusesTfl', function(tubestatusesTfl) {

    var self = this;
    this.message = 'helloo monkey';
    this.viewMsg = tubestatusesTfl.message;

      tubestatusesTfl.tfl().then(function(response) {
        self.tfl = response.data;
      },
        function(data) {
        console.log(data);
      })

    }]);

})();

(function() {
'use strict';

angular.module('myApp.tubestatuses')

  .factory('tubestatusesTfl', ['$http', function($http) {

    return {
      message: 'somebody stop me!',

      tfl : function() {
        return $http.get('https://api.tfl.gov.uk/line/mode/tube/status', {
          params: {
            api_id: '1a3ffbd2',
            api_key: '2adfb02001adfefa068f7a74862854e6'
          }
        });
      }
    }
  }])

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmNvbmZpZy5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmNvbnRyb2xsZXIuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5kaXJlY3RpdmUuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5mYWN0b3J5LmpzIiwicG9zdHMvcG9zdHMuY29uZmlnLmpzIiwicG9zdHMvcG9zdHMuY29udHJvbGxlci5qcyIsInBvc3RzL3Bvc3RzLmZhY3RvcnkuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29uZmlnLmpzIiwic3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmNvbnRyb2xsZXIuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuc2VydmljZS5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuY29uZmlnLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb250cm9sbGVyLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5mYWN0b3J5LnRleHQuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudmlldzFmYWN0LmpzIiwidHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5jb25maWcuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbnRyb2xsZXIuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHQgICRyb3V0ZVByb3ZpZGVyXHJcblx0ICAgIC53aGVuKCcvam91cm5leXBsYW5uZXInLCB7XHJcblx0ICAgICAgY29udHJvbGxlcjogJ2pvdXJuZXlQbGFubmVyJyxcclxuXHQgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuaHRtbCcsXHJcblx0ICAgICAgY29udHJvbGxlckFzOiAnam91cm5leXBsYW5uZXInXHJcblx0ICAgIH0pXHJcblx0fV0pO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG4gIC5jb250cm9sbGVyKCdqb3VybmV5UGxhbm5lcicsWydqb3VybmV5UGxhbm5lckZhY3QnLCAnJHNjb3BlJywgJyRsb2cnLCAnJGh0dHAnLCBmdW5jdGlvbihqb3VybmV5UGxhbm5lckZhY3QsICRzY29wZSwgJGxvZywgJGh0dHApIHtcclxuICAgXHJcbiAgJHNjb3BlLnBlcnNvbiA9ICdNaWtleSc7XHJcbiAgJHNjb3BlLmdldExvY2F0aW9uID0gZ2V0TG9jYXRpb247XHJcbiAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XHJcbiAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gIHRoaXMuZGVzdGluYXRpb25zO1xyXG4gIHRoaXMucHJvbWlzZUpvdXJuZXkgPSAnJztcclxuXHJcbiAgLyogZGlyZWN0aXZlIGN1c3RvbWVyIG5hbWUgKi9cclxuICB0aGlzLmN1c3RvbWVyID0ge1xyXG4gICAgbmFtZTogJ0VyaWMgQ2FudG9uYSdcclxuICB9XHJcblxyXG4gIC8qIHRhYnMgKi9cclxuICAkc2NvcGUudGFicyA9IFtcclxuICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgeyB0aXRsZTonRHluYW1pYyBUaXRsZSAyJywgY29udGVudDonRHluYW1pYyBjb250ZW50IDInLCBkaXNhYmxlZDogdHJ1ZSB9XHJcbiAgXTtcclxuICAgICAgIFxyXG4gIC8qIHR5cGVhaGVhZCAqL1xyXG4gIC8qIHJldHVybnMgbG9jYXRpb24gZnJvbSBxdWVyeSBpbnB1dCAqL1xyXG5cclxuICAgICAgZnVuY3Rpb24gZ2V0TG9jYXRpb24odmFsKSB7XHJcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvU3RvcFBvaW50L3NlYXJjaCcsIHtcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHF1ZXJ5OiB2YWwsXHJcbiAgICAgICAgICBtb2RlczogJ3R1YmUnXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXRjaGVzLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSBhc3luYycsIGl0ZW0pO1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvL3R5cGVhaGVhZCBlbmRcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZGVzdGluYXRpb25zJywgdGhpcy5kZXN0aW5hdGlvbnMpO1xyXG4gICAgICAgIGpvdXJuZXlQbGFubmVyRmFjdC5wcm9taXNlSm91cm5leUZlZWQodGhpcy5kZXN0aW5hdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICAgIHNlbGYucHJvbWlzZUpvdXJuZXkgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igd2l0aCBqb3VybmV5JywgcmVwb25zZS5kYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxuXHJcbiAgfV0pXHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcbiAgLmRpcmVjdGl2ZSgnbXlDdXN0b21lcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGVtcGxhdGU6ICdOYW1lIHt7ICBqb3VybmV5cGxhbm5lci5jdXN0b21lci5uYW1lIH19J1xyXG4gICAgfTtcclxuICB9KTtcclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcbiAgLmZhY3RvcnkoJ2pvdXJuZXlQbGFubmVyRmFjdCcsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9taXNlSm91cm5leUZlZWQ6IGZ1bmN0aW9uKGRlc3RpbmF0aW9ucykge1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBkZXN0aW5hdGlvbnMuZnJvbS5pY3NJZCArICcvdG8vJyArIGRlc3RpbmF0aW9ucy50by5pY3NJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfV0pO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5wb3N0cycpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvcG9zdHMnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9wb3N0cy9wb3N0cy5odG1sJyxcclxuICAgICAgY29udHJvbGxlcjogJ3Bvc3RzQ3RybCcsXHJcbiAgICAgIGNvbnRyb2xsZXJBczogJ3Bvc3RzJ1xyXG4gICAgfSk7XHJcbiAgfV0pXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5wb3N0cycpXHJcblx0LmNvbnRyb2xsZXIoJ3Bvc3RzQ3RybCcsIHBvc3RzQ3RybCk7XHJcblxyXG4gIGZ1bmN0aW9uIHBvc3RzQ3RybChwb3N0cyl7XHJcbiAgICB0aGlzLmhvd2R5ID0gJ21lc3NhZ2UgbWUgY291bGQgeWFsIHRvJztcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHBvc3RzLnBvc3RzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBzZWxmLnBvc3RzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHJcbiAgLmZhY3RvcnkoJ3Bvc3RzJywgWyckaHR0cCcsICdteUNvbmZpZycsIGZ1bmN0aW9uKCRodHRwLCBteUNvbmZpZyApIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgcG9zdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQobXlDb25maWcud29yZHByZXNzUG9zdHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1dKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHJcblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHQgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy9zdGFyd2FycycsIHtcclxuXHQgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3N0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5odG1sJyxcclxuXHQgICAgY29udHJvbGxlcjogJ3N0YXJ3YXJzJyxcclxuXHQgICAgY29udHJvbGxlckFzOiAnc3RhcndhcnNUZXh0J1xyXG5cdCAgfSk7XHJcblx0fV0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHJcblx0LmNvbnRyb2xsZXIoJ3N0YXJ3YXJzJywgWydieWxpbmVBbmltJywgJyRzY29wZScsICckbG9jYXRpb24nLCBmdW5jdGlvbihieWxpbmUsICRzY29wZSwgJGxvY2F0aW9uKSB7XHJcblx0XHQkc2NvcGUuYnlsaW5lO1xyXG5cdFx0JHNjb3BlLmFuaW1hdGlvbkVuZCA9IGFuaW1hdGlvbkVuZDtcclxuXHRcdGZ1bmN0aW9uIGFuaW1hdGlvbkVuZCgpe1xyXG5cdFx0XHRmdW5jdGlvbiBteVNjcmlwdCgpIHsgXHJcblx0XHRcdFx0Y29uc29sZS5sb2coJ2FuaW0gaXMgd29ya2luZyB3YWhvb28hJywgJGxvY2F0aW9uLnBhdGgoKSk7XHJcblx0XHRcdFx0JGxvY2F0aW9uLnBhdGgoJy90ZXJtaW5hbHRleHQnKTtcclxuXHRcdFx0XHQkc2NvcGUuJGFwcGx5KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcnRpbicpLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgbXlTY3JpcHQpO1xyXG5cdFx0fVxyXG5cclxuXHR9XSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXHJcblxyXG5cdC5zZXJ2aWNlKCdieWxpbmVBbmltJywgZnVuY3Rpb24oKXsgXHJcblxyXG5cdFx0LypcclxuXHRcdFx0VGhlIGZvbGxvd2luZyBKUyB0YWtlcyBpbiB0aGUgYnlsaW5lIGFuZCBzcGxpdHMgaXQgaW50byBsZXR0ZXJzLCBlYWNoIG9uZSB3cmFwcGVkIGluIGEgc3Bhbi4gV2UgbmVlZCB0byBjcmVhdGUgdGhlIHNwYW5zIGFzIG5vZGVzLCB3ZSBjYW4ndCBqdXN0IGFkZCB0aGVtIHRvIHRoZSBIVE1MIHVzaW5nIGlubmVySFRNTCwgYXMgdG8gZG8gc28gd291bGQgbWVhbiB0aGUgQ1NTIHdvbid0IGFmZmVjdCB0aGUgc3BhbiBiZWNhdXNlIGl0IGRvZXNuJ3QgcmVjb2duaXNlIHRoZSB0YWcgYXMgZXhpc3RpbmcuIEl0J3MgYW4gb2xkIHByb2JsZW0gd2UgcnVuIGludG8gdGltZSBhbmQgYWdhaW4uXHJcblx0XHQqL1xyXG5cclxuXHRcdFx0dmFyIGJ5bGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdieWxpbmUnKTsgIFx0Ly8gRmluZCB0aGUgSDJcclxuXHRcdFx0dmFyIGJ5bGluZVRleHQgPSBieWxpbmUuaW5uZXJIVE1MO1x0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBjb250ZW50IG9mIHRoZSBIMlxyXG5cdFx0XHR2YXIgYnlsaW5lQXJyID0gYnlsaW5lVGV4dC5zcGxpdCgnJyk7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BsaXQgY29udGVudCBpbnRvIGFycmF5XHJcblx0XHRcdGJ5bGluZS5pbm5lckhUTUwgPSAnJztcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRW1wdHkgY3VycmVudCBjb250ZW50XHJcblxyXG5cdFx0XHR2YXIgc3BhbjtcdFx0XHRcdFx0Ly8gQ3JlYXRlIHZhcmlhYmxlcyB0byBjcmVhdGUgZWxlbWVudHNcclxuXHRcdFx0dmFyIGxldHRlcjtcclxuXHJcblx0XHRcdGZvcih2YXIgaT0wO2k8YnlsaW5lQXJyLmxlbmd0aDtpKyspe1x0XHRcdFx0XHRcdFx0XHRcdC8vIExvb3AgZm9yIGV2ZXJ5IGxldHRlclxyXG5cdFx0XHQgIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgPHNwYW4+IGVsZW1lbnRcclxuXHRcdFx0ICBsZXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShieWxpbmVBcnJbaV0pO1x0Ly8gQ3JlYXRlIHRoZSBsZXR0ZXJcclxuXHRcdFx0ICBpZihieWxpbmVBcnJbaV0gPT0gJyAnKSB7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGxldHRlciBpcyBhIHNwYWNlLi4uXHJcblx0XHRcdCAgICBieWxpbmUuYXBwZW5kQ2hpbGQobGV0dGVyKTtcdFx0XHRcdFx0Ly8gLi4uQWRkIHRoZSBzcGFjZSB3aXRob3V0IGEgc3BhblxyXG5cdFx0XHQgIH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzcGFuLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdFx0Ly8gQWRkIHRoZSBsZXR0ZXIgdG8gdGhlIHNwYW5cclxuXHRcdFx0ICBcdGJ5bGluZS5hcHBlbmRDaGlsZChzcGFuKTsgXHRcdFx0XHRcdC8vIEFkZCB0aGUgc3BhbiB0byB0aGUgaDJcclxuXHRcdFx0ICB9XHJcblx0XHRcdH1cclxuXHJcblx0fSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnKVxyXG5cclxuICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL3Rlcm1pbmFsdGV4dCcsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3Rlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuaHRtbCcsXHJcbiAgICAgIGNvbnRyb2xsZXI6ICdUZXJtaW5hbFRleHRDdHJsJyxcclxuICAgICAgY29udHJvbGxlckFzOiAndGVybWluYWx0ZXh0J1xyXG4gICAgfSk7XHJcbiAgfV0pO1xyXG4gIFxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnKVxyXG5cclxuICAuY29udHJvbGxlcignVGVybWluYWxUZXh0Q3RybCcsIFsndmlldzFGYWN0JywgJ3Rlcm1pbmFsVGV4dCcsICckc2NvcGUnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbih2aWV3MUZhY3QsIHRlcm1pbmFsVGV4dCwgJHNjb3BlLCAkdGltZW91dCkge1xyXG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgIHRoaXMudGVybWluYWxUZXh0ID0gdGVybWluYWxUZXh0LnRlcm1pbmFsKCcudGVybWluYWwnKTtcclxuICAgICAgdmlldzFGYWN0LnBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHNlbGYuaG9tZXBhZ2UgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndmlldzFGYWN0IGNvbnRyb2xsZXIgbm90IHdvcmtpbmcgJywgcmVhc29uKTtcclxuICAgICAgfSk7XHJcbiAgICAgICRzY29wZS4kb24oJ3Rlcm1pbmFsVGV4dEZpbmlzaCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdicm9hZGNhc3QgaGFzIHdvcmtlZCcpO1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICRzY29wZS5zZXRIb21lQnRuID0gdHJ1ZTtcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucGVla0J0bkNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgXHJcbiAgICAgIH1cclxuXHJcbiAgfV0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuICBcclxuICAuZmFjdG9yeSgndGVybWluYWxUZXh0JywgWyckcScsICckaW50ZXJ2YWwnLCAnJHRpbWVvdXQnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCRxLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkcm9vdFNjb3BlKSB7XHJcbiAgIFxyXG4gICAgdmFyIGRlbGF5ID0gMjAwMDtcclxuICAgIHZhciBpdGVyYXRvcjtcclxuICAgIHZhciBibGlua0xldHRlcnM7XHJcbiAgICB2YXIgYmxpbmtMZXR0ZXJzQ2xhc3M7XHJcbiAgICB2YXIgdGVybWluYWxUZXh0MTtcclxuICAgIHZhciBhbmltYXRpb25UZXh0O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEFuaW1hdGVzIHRoZSBibGluayB0ZXh0XHJcbiAgICAgICAqIEBwYXJhbSBjbGFzcyBjb250YWluaW5nIHRoZSB0ZXh0IHRvIGFuaW1hdGUuXHJcbiAgICAgICAqICRzY29wZS4kZW1pdHMgdGVybWluYWxUZXh0RmluaXNoIGFmdGVyIGZ1bmN0aW9uIGZpbmlzaGVzLlxyXG4gICAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldEJsaW5reSh0ZXh0KSB7IFxyXG5cclxuICAgICAgYmxpbmtMZXR0ZXJzQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRleHQpO1xyXG4gICAgICBibGlua0xldHRlcnMgPSBibGlua0xldHRlcnNDbGFzcy5pbm5lckhUTUw7XHJcbiAgICAgIGFuaW1hdGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uVGV4dCcpO1xyXG4gICAgICBibGlua0xldHRlcnNDbGFzcy5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ0ZXJtaW5hbFRleHQxXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiYmxpbmtcIj4mI3g3Yzs8L3NwYW4+JztcclxuXHJcbiAgICAgIHZhciBibGlua1BpcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxpbmsnKTtcclxuXHJcbiAgICAgIHZhciBibGluayA9ICRpbnRlcnZhbCggZnVuY3Rpb24oKSB7IGlmIChibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9PSAwIHx8IGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID09ICcnICkgeyBibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9IDEgfSBlbHNlIHtibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9IDAgfX0sIDYwMCk7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQW5pbWF0ZXMgdGhyb3VnaCB0aGUgc3RyaW5nLiBTZXRzIHRoZSBzZXRUaW1lb3V0IGZ1bmN0aW9uLlxyXG4gICAgICAgKi9cclxuXHJcbiAgICAgICBmdW5jdGlvbiBhbmltYXRlQmxpbmsoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gYmxpbmtMZXR0ZXJzLmxlbmd0aCsxOyBpKyspIHtcclxuICAgICAgICAgIGlmKCBpID09IGJsaW5rTGV0dGVycy5sZW5ndGggKyAxICkge1xyXG4gICAgICAgICAgICBkZWxheSA9IGRlbGF5ICsgMTAwMDtcclxuICAgICAgICAgICAgc2V0Q2FsbEJhY2tUaW1lT3V0KGRlbGF5KTsgXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGVsYXkgPSBkZWxheSArIDUwMDtcclxuICAgICAgICAgIHNldFRoZVRpbWVvdXQoaSxkZWxheSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIFNldHMgY2FsbGJhY2sgdG8gYW5pbWF0ZUJsaW5rIGZ1bmN0aW9uXHJcbiAgICAgICAqL1xyXG4gICAgICAgZnVuY3Rpb24gc2V0Q2FsbEJhY2tUaW1lT3V0KGRlbGF5KSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0ZXJtaW5hbFRleHQxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlcm1pbmFsVGV4dDEnKTtcclxuICAgICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS50b3AgPSAnNTAlJztcclxuICAgICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUubGVmdCA9ICc1MCUnO1xyXG4gICAgICAgICAgdGVybWluYWxUZXh0MS5jbGFzc05hbWUgKz0gJyBjZW50ZXJUZXh0QWZ0ZXJBbmltJztcclxuICAgICAgICAgIGJsaW5rUGlwZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJsaW5rUGlwZSk7XHJcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3Rlcm1pbmFsVGV4dEZpbmlzaCcpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBJdGVyYXRvcnMgdGhlIHNldFRpbWVvdXQgZm9yIGFuaW1hdGlvbi5cclxuICAgICAgICovXHJcbiAgICAgICBmdW5jdGlvbiBzZXRUaGVUaW1lb3V0KGl0ZXJhdG9yLCBkZWxheSkge1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVybWluYWxUZXh0MScpLmlubmVySFRNTCA9IGJsaW5rTGV0dGVycy5zdWJzdHIoMCwgaXRlcmF0b3IpO1xyXG4gICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIGFuaW1hdGVCbGluaygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXJtaW5hbDogZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAgIHNldEJsaW5reSh0ZXh0KVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1dKVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmZhY3RvcnkoJ3ZpZXcxRmFjdCcsIFsnJGh0dHAnLCAnbXlDb25maWcnLCBmdW5jdGlvbigkaHR0cCwgbXlDb25maWcpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZXdNZXNzYWdlOiAnbm9vb28nLFxyXG5cclxuICAgICAgcGFnZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQobXlDb25maWcud29yZHByZXNzUGFnZXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1dKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL3R1YmVzdGF0dXNlcycsIHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ3R1YmVzdGF0dXNlc0N0cmwnLFxyXG4gICAgICAgICAgY29udHJvbGxlckFzOiAndHViZXN0YXR1c2VzVGZsJ1xyXG4gICAgICAgIH0pXHJcbiAgfV0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ3R1YmVzdGF0dXNlc0N0cmwnLCBbJ3R1YmVzdGF0dXNlc1RmbCcsIGZ1bmN0aW9uKHR1YmVzdGF0dXNlc1RmbCkge1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMubWVzc2FnZSA9ICdoZWxsb28gbW9ua2V5JztcclxuICAgIHRoaXMudmlld01zZyA9IHR1YmVzdGF0dXNlc1RmbC5tZXNzYWdlO1xyXG5cclxuICAgICAgdHViZXN0YXR1c2VzVGZsLnRmbCgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLnRmbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH1dKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5mYWN0b3J5KCd0dWJlc3RhdHVzZXNUZmwnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlOiAnc29tZWJvZHkgc3RvcCBtZSEnLFxyXG5cclxuICAgICAgdGZsIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9saW5lL21vZGUvdHViZS9zdGF0dXMnLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgYXBpX2lkOiAnMWEzZmZiZDInLFxyXG4gICAgICAgICAgICBhcGlfa2V5OiAnMmFkZmIwMjAwMWFkZmVmYTA2OGY3YTc0ODYyODU0ZTYnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XSlcclxuXHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
