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

  .controller('journeyPlanner', journeyPlanner);

  journeyPlanner.$inject = ['journeyPlannerFact', '$scope', '$log', '$http'];

  function journeyPlanner(journeyPlannerFact, $scope, $log, $http) {
   
    $scope.person = 'Mikeys';
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
    }
  }

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

	.factory('journeyPlannerFact', journeyPlannerFact);

	journeyPlannerFact.$inject = ['$http'];
	
	function journeyPlannerFact($http) {
      return {
        promiseJourneyFeed: function(destinations) {
          return $http.get('https://api.tfl.gov.uk/journey/journeyresults/' + destinations.from.icsId + '/to/' + destinations.to.icsId);
        }
      }
  	}

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

  postsCtrl.$inject = ['posts'];
  
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

  .factory('posts', posts);
  posts.$inject = ['$http', 'myConfig'];

  function posts($http, myConfig) {

    return {

      posts: function() {
        return $http.get(myConfig.wordpressPosts);
      }

    }
  }

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

	.controller('starwars', starwars);

	starwars.$inject = ['bylineAnim', '$scope', '$location'];

	function starwars(byline, $scope, $location) {
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

	}

})();
(function() {
'use strict';

angular.module('myApp.starwarsText')
	
	.service('bylineAnim', bylineAnim);

	function bylineAnim(){ 

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

	}

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

  .controller('TerminalTextCtrl', TerminalTextCtrl);

  TerminalTextCtrl.$inject = ['view1Fact', 'terminalText', '$scope', '$timeout'];

  function TerminalTextCtrl(view1Fact, terminalText, $scope, $timeout) {
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

  }

})();
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
(function() {
  'use strict';

  angular.module('myApp.terminaltext')

  .factory('view1Fact', view1Fact);

  view1Fact.$inject = ['$http', 'myConfig'];

  function view1Fact($http, myConfig) {

    return {
      newMessage: 'noooo',

      pages: function() {
        return $http.get(myConfig.wordpressPages);
      }

    }
  }

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

  .controller('tubestatusesCtrl', tubestatusesCtrl);

  tubestatusesCtrl.$inject = ['tubestatusesTfl'];

  function tubestatusesCtrl(tubestatusesTfl) {

    var self = this;
    this.message = 'helloo monkey';
    this.viewMsg = tubestatusesTfl.message;

      tubestatusesTfl.tfl().then(function(response) {
        self.tfl = response.data;
      },
        function(data) {
        console.log(data);
      })

    }

})();

(function() {
'use strict';

angular.module('myApp.tubestatuses')

  .factory('tubestatusesTfl', tubestatusesTfl);

  tubestatusesTfl.$inject = ['$http']

  function tubestatusesTfl($http) {

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
  }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmNvbmZpZy5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmNvbnRyb2xsZXIuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5kaXJlY3RpdmUuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5mYWN0b3J5LmpzIiwicG9zdHMvcG9zdHMuY29uZmlnLmpzIiwicG9zdHMvcG9zdHMuY29udHJvbGxlci5qcyIsInBvc3RzL3Bvc3RzLmZhY3RvcnkuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29uZmlnLmpzIiwic3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmNvbnRyb2xsZXIuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuc2VydmljZS5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuY29uZmlnLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb250cm9sbGVyLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5mYWN0b3J5LnRleHQuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudmlldzFmYWN0LmpzIiwidHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5jb25maWcuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbnRyb2xsZXIuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG5cdC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblx0ICAkcm91dGVQcm92aWRlclxyXG5cdCAgICAud2hlbignL2pvdXJuZXlwbGFubmVyJywge1xyXG5cdCAgICAgIGNvbnRyb2xsZXI6ICdqb3VybmV5UGxhbm5lcicsXHJcblx0ICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2pvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmh0bWwnLFxyXG5cdCAgICAgIGNvbnRyb2xsZXJBczogJ2pvdXJuZXlwbGFubmVyJ1xyXG5cdCAgICB9KVxyXG5cdH1dKTtcclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuICAuY29udHJvbGxlcignam91cm5leVBsYW5uZXInLCBqb3VybmV5UGxhbm5lcik7XHJcblxyXG4gIGpvdXJuZXlQbGFubmVyLiRpbmplY3QgPSBbJ2pvdXJuZXlQbGFubmVyRmFjdCcsICckc2NvcGUnLCAnJGxvZycsICckaHR0cCddO1xyXG5cclxuICBmdW5jdGlvbiBqb3VybmV5UGxhbm5lcihqb3VybmV5UGxhbm5lckZhY3QsICRzY29wZSwgJGxvZywgJGh0dHApIHtcclxuICAgXHJcbiAgICAkc2NvcGUucGVyc29uID0gJ01pa2V5cyc7XHJcbiAgICAkc2NvcGUuZ2V0TG9jYXRpb24gPSBnZXRMb2NhdGlvbjtcclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5kZXN0aW5hdGlvbnM7XHJcbiAgICB0aGlzLnByb21pc2VKb3VybmV5ID0gJyc7XHJcblxyXG4gICAgLyogZGlyZWN0aXZlIGN1c3RvbWVyIG5hbWUgKi9cclxuICAgIHRoaXMuY3VzdG9tZXIgPSB7XHJcbiAgICAgIG5hbWU6ICdFcmljIENhbnRvbmEnXHJcbiAgICB9XHJcblxyXG4gICAgLyogdGFicyAqL1xyXG4gICAgJHNjb3BlLnRhYnMgPSBbXHJcbiAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgIF07XHJcbiAgICAgICAgIFxyXG4gICAgLyogdHlwZWFoZWFkICovXHJcbiAgICAvKiByZXR1cm5zIGxvY2F0aW9uIGZyb20gcXVlcnkgaW5wdXQgKi9cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRMb2NhdGlvbih2YWwpIHtcclxuICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9TdG9wUG9pbnQvc2VhcmNoJywge1xyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgcXVlcnk6IHZhbCxcclxuICAgICAgICAgIG1vZGVzOiAndHViZSdcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hdGNoZXMubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlIGFzeW5jJywgaXRlbSk7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgIH07XHJcblxyXG4gICAvL3R5cGVhaGVhZCBlbmRcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZXN0aW5hdGlvbnMnLCB0aGlzLmRlc3RpbmF0aW9ucyk7XHJcbiAgICAgIGpvdXJuZXlQbGFubmVyRmFjdC5wcm9taXNlSm91cm5leUZlZWQodGhpcy5kZXN0aW5hdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLnByb21pc2VKb3VybmV5ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igd2l0aCBqb3VybmV5JywgcmVwb25zZS5kYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG4gIC5kaXJlY3RpdmUoJ215Q3VzdG9tZXInLCBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRlbXBsYXRlOiAnTmFtZSB7eyAgam91cm5leXBsYW5uZXIuY3VzdG9tZXIubmFtZSB9fSdcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcblx0LmZhY3RvcnkoJ2pvdXJuZXlQbGFubmVyRmFjdCcsIGpvdXJuZXlQbGFubmVyRmFjdCk7XHJcblxyXG5cdGpvdXJuZXlQbGFubmVyRmFjdC4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGpvdXJuZXlQbGFubmVyRmFjdCgkaHR0cCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb21pc2VKb3VybmV5RmVlZDogZnVuY3Rpb24oZGVzdGluYXRpb25zKSB7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGRlc3RpbmF0aW9ucy5mcm9tLmljc0lkICsgJy90by8nICsgZGVzdGluYXRpb25zLnRvLmljc0lkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICBcdH1cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxyXG5cclxuICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL3Bvc3RzJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvcG9zdHMvcG9zdHMuaHRtbCcsXHJcbiAgICAgIGNvbnRyb2xsZXI6ICdwb3N0c0N0cmwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICdwb3N0cydcclxuICAgIH0pO1xyXG4gIH1dKVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnLFxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxyXG5cdC5jb250cm9sbGVyKCdwb3N0c0N0cmwnLCBwb3N0c0N0cmwpO1xyXG5cclxuICBwb3N0c0N0cmwuJGluamVjdCA9IFsncG9zdHMnXTtcclxuICBcclxuICBmdW5jdGlvbiBwb3N0c0N0cmwocG9zdHMpe1xyXG4gICAgdGhpcy5ob3dkeSA9ICdtZXNzYWdlIG1lIGNvdWxkIHlhbCB0byc7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBwb3N0cy5wb3N0cygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgc2VsZi5wb3N0cyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9LCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5wb3N0cycpXHJcblxyXG4gIC5mYWN0b3J5KCdwb3N0cycsIHBvc3RzKTtcclxuICBwb3N0cy4kaW5qZWN0ID0gWyckaHR0cCcsICdteUNvbmZpZyddO1xyXG5cclxuICBmdW5jdGlvbiBwb3N0cygkaHR0cCwgbXlDb25maWcpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgcG9zdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQobXlDb25maWcud29yZHByZXNzUG9zdHMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHJcblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHQgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy9zdGFyd2FycycsIHtcclxuXHQgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3N0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5odG1sJyxcclxuXHQgICAgY29udHJvbGxlcjogJ3N0YXJ3YXJzJyxcclxuXHQgICAgY29udHJvbGxlckFzOiAnc3RhcndhcnNUZXh0J1xyXG5cdCAgfSk7XHJcblx0fV0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHJcblx0LmNvbnRyb2xsZXIoJ3N0YXJ3YXJzJywgc3RhcndhcnMpO1xyXG5cclxuXHRzdGFyd2Fycy4kaW5qZWN0ID0gWydieWxpbmVBbmltJywgJyRzY29wZScsICckbG9jYXRpb24nXTtcclxuXHJcblx0ZnVuY3Rpb24gc3RhcndhcnMoYnlsaW5lLCAkc2NvcGUsICRsb2NhdGlvbikge1xyXG5cdFx0JHNjb3BlLmJ5bGluZTtcclxuXHRcdCRzY29wZS5hbmltYXRpb25FbmQgPSBhbmltYXRpb25FbmQ7XHJcblx0XHRmdW5jdGlvbiBhbmltYXRpb25FbmQoKXtcclxuXHRcdFx0ZnVuY3Rpb24gbXlTY3JpcHQoKSB7IFxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhbmltIGlzIHdvcmtpbmcgd2Fob29vIScsICRsb2NhdGlvbi5wYXRoKCkpO1xyXG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvdGVybWluYWx0ZXh0Jyk7XHJcblx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXJ0aW4nKS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIG15U2NyaXB0KTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5zdGFyd2Fyc1RleHQnKVxyXG5cdFxyXG5cdC5zZXJ2aWNlKCdieWxpbmVBbmltJywgYnlsaW5lQW5pbSk7XHJcblxyXG5cdGZ1bmN0aW9uIGJ5bGluZUFuaW0oKXsgXHJcblxyXG5cdFx0LypcclxuXHRcdFx0VGhlIGZvbGxvd2luZyBKUyB0YWtlcyBpbiB0aGUgYnlsaW5lIGFuZCBzcGxpdHMgaXQgaW50byBsZXR0ZXJzLCBlYWNoIG9uZSB3cmFwcGVkIGluIGEgc3Bhbi4gV2UgbmVlZCB0byBjcmVhdGUgdGhlIHNwYW5zIGFzIG5vZGVzLCB3ZSBjYW4ndCBqdXN0IGFkZCB0aGVtIHRvIHRoZSBIVE1MIHVzaW5nIGlubmVySFRNTCwgYXMgdG8gZG8gc28gd291bGQgbWVhbiB0aGUgQ1NTIHdvbid0IGFmZmVjdCB0aGUgc3BhbiBiZWNhdXNlIGl0IGRvZXNuJ3QgcmVjb2duaXNlIHRoZSB0YWcgYXMgZXhpc3RpbmcuIEl0J3MgYW4gb2xkIHByb2JsZW0gd2UgcnVuIGludG8gdGltZSBhbmQgYWdhaW4uXHJcblx0XHQqL1xyXG5cclxuXHRcdFx0dmFyIGJ5bGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdieWxpbmUnKTsgIFx0Ly8gRmluZCB0aGUgSDJcclxuXHRcdFx0dmFyIGJ5bGluZVRleHQgPSBieWxpbmUuaW5uZXJIVE1MO1x0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBjb250ZW50IG9mIHRoZSBIMlxyXG5cdFx0XHR2YXIgYnlsaW5lQXJyID0gYnlsaW5lVGV4dC5zcGxpdCgnJyk7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BsaXQgY29udGVudCBpbnRvIGFycmF5XHJcblx0XHRcdGJ5bGluZS5pbm5lckhUTUwgPSAnJztcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRW1wdHkgY3VycmVudCBjb250ZW50XHJcblxyXG5cdFx0XHR2YXIgc3BhbjtcdFx0XHRcdFx0Ly8gQ3JlYXRlIHZhcmlhYmxlcyB0byBjcmVhdGUgZWxlbWVudHNcclxuXHRcdFx0dmFyIGxldHRlcjtcclxuXHJcblx0XHRcdGZvcih2YXIgaT0wO2k8YnlsaW5lQXJyLmxlbmd0aDtpKyspe1x0XHRcdFx0XHRcdFx0XHRcdC8vIExvb3AgZm9yIGV2ZXJ5IGxldHRlclxyXG5cdFx0XHQgIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgPHNwYW4+IGVsZW1lbnRcclxuXHRcdFx0ICBsZXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShieWxpbmVBcnJbaV0pO1x0Ly8gQ3JlYXRlIHRoZSBsZXR0ZXJcclxuXHRcdFx0ICBpZihieWxpbmVBcnJbaV0gPT0gJyAnKSB7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGxldHRlciBpcyBhIHNwYWNlLi4uXHJcblx0XHRcdCAgICBieWxpbmUuYXBwZW5kQ2hpbGQobGV0dGVyKTtcdFx0XHRcdFx0Ly8gLi4uQWRkIHRoZSBzcGFjZSB3aXRob3V0IGEgc3BhblxyXG5cdFx0XHQgIH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzcGFuLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdFx0Ly8gQWRkIHRoZSBsZXR0ZXIgdG8gdGhlIHNwYW5cclxuXHRcdFx0ICBcdGJ5bGluZS5hcHBlbmRDaGlsZChzcGFuKTsgXHRcdFx0XHRcdC8vIEFkZCB0aGUgc3BhbiB0byB0aGUgaDJcclxuXHRcdFx0ICB9XHJcblx0XHRcdH1cclxuXHJcblx0fVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy90ZXJtaW5hbHRleHQnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0Lmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyOiAnVGVybWluYWxUZXh0Q3RybCcsXHJcbiAgICAgIGNvbnRyb2xsZXJBczogJ3Rlcm1pbmFsdGV4dCdcclxuICAgIH0pO1xyXG4gIH1dKTtcclxuICBcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ1Rlcm1pbmFsVGV4dEN0cmwnLCBUZXJtaW5hbFRleHRDdHJsKTtcclxuXHJcbiAgVGVybWluYWxUZXh0Q3RybC4kaW5qZWN0ID0gWyd2aWV3MUZhY3QnLCAndGVybWluYWxUZXh0JywgJyRzY29wZScsICckdGltZW91dCddO1xyXG5cclxuICBmdW5jdGlvbiBUZXJtaW5hbFRleHRDdHJsKHZpZXcxRmFjdCwgdGVybWluYWxUZXh0LCAkc2NvcGUsICR0aW1lb3V0KSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgdGhpcy50ZXJtaW5hbFRleHQgPSB0ZXJtaW5hbFRleHQudGVybWluYWwoJy50ZXJtaW5hbCcpO1xyXG4gICAgICB2aWV3MUZhY3QucGFnZXMoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgc2VsZi5ob21lcGFnZSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWV3MUZhY3QgY29udHJvbGxlciBub3Qgd29ya2luZyAnLCByZWFzb24pO1xyXG4gICAgICB9KTtcclxuICAgICAgJHNjb3BlLiRvbigndGVybWluYWxUZXh0RmluaXNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jyb2FkY2FzdCBoYXMgd29ya2VkJyk7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJHNjb3BlLnNldEhvbWVCdG4gPSB0cnVlO1xyXG4gICAgICAgIH0sIDIwMDApO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wZWVrQnRuQ2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBcclxuICAgICAgfVxyXG5cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnKVxyXG4gIFxyXG4gIC5mYWN0b3J5KCd0ZXJtaW5hbFRleHQnLCB0ZXJtaW5hbHRleHQpO1xyXG4gIHRlcm1pbmFsdGV4dC4kaW5qZWN0ID0gWyckcScsICckaW50ZXJ2YWwnLCAnJHRpbWVvdXQnLCAnJHJvb3RTY29wZSddO1xyXG5cclxuICBmdW5jdGlvbiB0ZXJtaW5hbHRleHQoJHEsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRyb290U2NvcGUpIHtcclxuICAgXHJcbiAgICB2YXIgZGVsYXkgPSAyMDAwO1xyXG4gICAgdmFyIGl0ZXJhdG9yO1xyXG4gICAgdmFyIGJsaW5rTGV0dGVycztcclxuICAgIHZhciBibGlua0xldHRlcnNDbGFzcztcclxuICAgIHZhciB0ZXJtaW5hbFRleHQxO1xyXG4gICAgdmFyIGFuaW1hdGlvblRleHQ7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQW5pbWF0ZXMgdGhlIGJsaW5rIHRleHRcclxuICAgICAgICogQHBhcmFtIGNsYXNzIGNvbnRhaW5pbmcgdGhlIHRleHQgdG8gYW5pbWF0ZS5cclxuICAgICAgICogJHNjb3BlLiRlbWl0cyB0ZXJtaW5hbFRleHRGaW5pc2ggYWZ0ZXIgZnVuY3Rpb24gZmluaXNoZXMuXHJcbiAgICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2V0Qmxpbmt5KHRleHQpIHsgXHJcblxyXG4gICAgICBibGlua0xldHRlcnNDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGV4dCk7XHJcbiAgICAgIGJsaW5rTGV0dGVycyA9IGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTDtcclxuICAgICAgYW5pbWF0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb25UZXh0Jyk7XHJcbiAgICAgIGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRlcm1pbmFsVGV4dDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJibGlua1wiPiYjeDdjOzwvc3Bhbj4nO1xyXG5cclxuICAgICAgdmFyIGJsaW5rUGlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibGluaycpO1xyXG5cclxuICAgICAgdmFyIGJsaW5rID0gJGludGVydmFsKCBmdW5jdGlvbigpIHsgaWYgKGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID09IDAgfHwgYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPT0gJycgKSB7IGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMSB9IGVsc2Uge2JsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMCB9fSwgNjAwKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBBbmltYXRlcyB0aHJvdWdoIHRoZSBzdHJpbmcuIFNldHMgdGhlIHNldFRpbWVvdXQgZnVuY3Rpb24uXHJcbiAgICAgICAqL1xyXG5cclxuICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVCbGluaygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBibGlua0xldHRlcnMubGVuZ3RoKzE7IGkrKykge1xyXG4gICAgICAgICAgaWYoIGkgPT0gYmxpbmtMZXR0ZXJzLmxlbmd0aCArIDEgKSB7XHJcbiAgICAgICAgICAgIGRlbGF5ID0gZGVsYXkgKyAxMDAwO1xyXG4gICAgICAgICAgICBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpOyBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkZWxheSA9IGRlbGF5ICsgNTAwO1xyXG4gICAgICAgICAgc2V0VGhlVGltZW91dChpLGRlbGF5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogU2V0cyBjYWxsYmFjayB0byBhbmltYXRlQmxpbmsgZnVuY3Rpb25cclxuICAgICAgICovXHJcbiAgICAgICBmdW5jdGlvbiBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpIHtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRlcm1pbmFsVGV4dDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVybWluYWxUZXh0MScpO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLnRvcCA9ICc1MCUnO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5sZWZ0ID0gJzUwJSc7XHJcbiAgICAgICAgICB0ZXJtaW5hbFRleHQxLmNsYXNzTmFtZSArPSAnIGNlbnRlclRleHRBZnRlckFuaW0nO1xyXG4gICAgICAgICAgYmxpbmtQaXBlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmxpbmtQaXBlKTtcclxuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndGVybWluYWxUZXh0RmluaXNoJyk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEl0ZXJhdG9ycyB0aGUgc2V0VGltZW91dCBmb3IgYW5pbWF0aW9uLlxyXG4gICAgICAgKi9cclxuICAgICAgIGZ1bmN0aW9uIHNldFRoZVRpbWVvdXQoaXRlcmF0b3IsIGRlbGF5KSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXJtaW5hbFRleHQxJykuaW5uZXJIVE1MID0gYmxpbmtMZXR0ZXJzLnN1YnN0cigwLCBpdGVyYXRvcik7XHJcbiAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgYW5pbWF0ZUJsaW5rKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRlcm1pbmFsOiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgc2V0Qmxpbmt5KHRleHQpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmZhY3RvcnkoJ3ZpZXcxRmFjdCcsIHZpZXcxRmFjdCk7XHJcblxyXG4gIHZpZXcxRmFjdC4kaW5qZWN0ID0gWyckaHR0cCcsICdteUNvbmZpZyddO1xyXG5cclxuICBmdW5jdGlvbiB2aWV3MUZhY3QoJGh0dHAsIG15Q29uZmlnKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmV3TWVzc2FnZTogJ25vb29vJyxcclxuXHJcbiAgICAgIHBhZ2VzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLndoZW4oJy90dWJlc3RhdHVzZXMnLCB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvdHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5odG1sJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICd0dWJlc3RhdHVzZXNDdHJsJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3R1YmVzdGF0dXNlc1RmbCdcclxuICAgICAgICB9KVxyXG4gIH1dKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5jb250cm9sbGVyKCd0dWJlc3RhdHVzZXNDdHJsJywgdHViZXN0YXR1c2VzQ3RybCk7XHJcblxyXG4gIHR1YmVzdGF0dXNlc0N0cmwuJGluamVjdCA9IFsndHViZXN0YXR1c2VzVGZsJ107XHJcblxyXG4gIGZ1bmN0aW9uIHR1YmVzdGF0dXNlc0N0cmwodHViZXN0YXR1c2VzVGZsKSB7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gJ2hlbGxvbyBtb25rZXknO1xyXG4gICAgdGhpcy52aWV3TXNnID0gdHViZXN0YXR1c2VzVGZsLm1lc3NhZ2U7XHJcblxyXG4gICAgICB0dWJlc3RhdHVzZXNUZmwudGZsKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHNlbGYudGZsID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcclxuXHJcbiAgLmZhY3RvcnkoJ3R1YmVzdGF0dXNlc1RmbCcsIHR1YmVzdGF0dXNlc1RmbCk7XHJcblxyXG4gIHR1YmVzdGF0dXNlc1RmbC4kaW5qZWN0ID0gWyckaHR0cCddXHJcblxyXG4gIGZ1bmN0aW9uIHR1YmVzdGF0dXNlc1RmbCgkaHR0cCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzb21lYm9keSBzdG9wIG1lIScsXHJcblxyXG4gICAgICB0ZmwgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2xpbmUvbW9kZS90dWJlL3N0YXR1cycsIHtcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBhcGlfaWQ6ICcxYTNmZmJkMicsXHJcbiAgICAgICAgICAgIGFwaV9rZXk6ICcyYWRmYjAyMDAxYWRmZWZhMDY4ZjdhNzQ4NjI4NTRlNidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
