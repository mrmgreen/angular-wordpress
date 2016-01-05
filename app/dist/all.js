(function() {
	'use strict',

	angular.module('myApp.about')

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/about', {
				controller: 'aboutCtrl',
				controllerAs: 'vm',
				templateUrl: 'components/about/about.html'
			})
	}]);


})();
(function() {
	'use strict',

	angular.module('myApp.about')

	.controller('aboutCtrl', aboutCtrl)

	aboutCtrl.$inject = ['pages'];

	function aboutCtrl(pages) {
		var self = this;
		pages.pages().then(function(response) {
			self.pages = response.data;
		}, function(data) {
			console.log(data);
		})
		this.message = "all is good";
	}

})();
(function() {
  'use strict';

  angular.module('myApp.about')

  .factory('pages', pages);
  pages.$inject = ['$http', 'myConfig'];

  function pages($http, myConfig) {

    return {

      pages: function() {
        return $http.get(myConfig.wordpressPages);
      }

    }
  }

})();
(function() {
  'use strict',

	angular.module('myApp.journeyplanner')

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	    .when('/journeyplanner', {
	      controller: 'journeyPlanner',
	      templateUrl: 'components/journeyplanner/journeyplanner.html',
	      controllerAs: 'vm'
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
      controllerAs: 'vm'
    });
  }])

})();
(function() {
	'use strict',

	angular.module('myApp.posts')
	.controller('postsCtrl', postsCtrl);

  postsCtrl.$inject = ['posts'];
  
  function postsCtrl(posts){
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
	    controllerAs: 'vm'
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
      controllerAs: 'vm'
    });
  }]);
  
})();
(function() {
  'use strict';

  angular.module('myApp.terminaltext')

  .controller('TerminalTextCtrl', TerminalTextCtrl);

  TerminalTextCtrl.$inject = ['view1Fact', 'terminalText', '$scope', '$timeout', '$location'];

  function TerminalTextCtrl(view1Fact, terminalText, $scope, $timeout, $location) {
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
        console.log('peekaboo');
        $location.path('/about');
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
          controllerAs: 'vm'
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

  tubestatusesTfl.$inject = ['$http'];

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0L2Fib3V0LmNvbmZpZy5qcyIsImFib3V0L2Fib3V0LmNvbnRyb2xsZXIuanMiLCJhYm91dC9hYm91dC5mYWN0b3J5LmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29uZmlnLmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29udHJvbGxlci5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmRpcmVjdGl2ZS5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmZhY3RvcnkuanMiLCJwb3N0cy9wb3N0cy5jb25maWcuanMiLCJwb3N0cy9wb3N0cy5jb250cm9sbGVyLmpzIiwicG9zdHMvcG9zdHMuZmFjdG9yeS5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5jb25maWcuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29udHJvbGxlci5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5zZXJ2aWNlLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb25maWcuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmNvbnRyb2xsZXIuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudGV4dC5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuZmFjdG9yeS52aWV3MWZhY3QuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbmZpZy5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuY29udHJvbGxlci5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcclxuXHJcblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdCRyb3V0ZVByb3ZpZGVyXHJcblx0XHRcdC53aGVuKCcvYWJvdXQnLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCcsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9hYm91dC9hYm91dC5odG1sJ1xyXG5cdFx0XHR9KVxyXG5cdH1dKTtcclxuXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5hYm91dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdhYm91dEN0cmwnLCBhYm91dEN0cmwpXHJcblxyXG5cdGFib3V0Q3RybC4kaW5qZWN0ID0gWydwYWdlcyddO1xyXG5cclxuXHRmdW5jdGlvbiBhYm91dEN0cmwocGFnZXMpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHBhZ2VzLnBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRzZWxmLnBhZ2VzID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHR9KVxyXG5cdFx0dGhpcy5tZXNzYWdlID0gXCJhbGwgaXMgZ29vZFwiO1xyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcclxuXHJcbiAgLmZhY3RvcnkoJ3BhZ2VzJywgcGFnZXMpO1xyXG4gIHBhZ2VzLiRpbmplY3QgPSBbJyRodHRwJywgJ215Q29uZmlnJ107XHJcblxyXG4gIGZ1bmN0aW9uIHBhZ2VzKCRodHRwLCBteUNvbmZpZykge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICBwYWdlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQYWdlcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuXHQuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG5cdCAgJHJvdXRlUHJvdmlkZXJcclxuXHQgICAgLndoZW4oJy9qb3VybmV5cGxhbm5lcicsIHtcclxuXHQgICAgICBjb250cm9sbGVyOiAnam91cm5leVBsYW5uZXInLFxyXG5cdCAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9qb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5odG1sJyxcclxuXHQgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuXHQgICAgfSlcclxuXHR9XSk7XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ2pvdXJuZXlQbGFubmVyJywgam91cm5leVBsYW5uZXIpO1xyXG5cclxuICBqb3VybmV5UGxhbm5lci4kaW5qZWN0ID0gWydqb3VybmV5UGxhbm5lckZhY3QnLCAnJHNjb3BlJywgJyRsb2cnLCAnJGh0dHAnXTtcclxuXHJcbiAgZnVuY3Rpb24gam91cm5leVBsYW5uZXIoam91cm5leVBsYW5uZXJGYWN0LCAkc2NvcGUsICRsb2csICRodHRwKSB7XHJcbiAgIFxyXG4gICAgJHNjb3BlLnBlcnNvbiA9ICdNaWtleXMnO1xyXG4gICAgJHNjb3BlLmdldExvY2F0aW9uID0gZ2V0TG9jYXRpb247XHJcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuZGVzdGluYXRpb25zO1xyXG4gICAgdGhpcy5wcm9taXNlSm91cm5leSA9ICcnO1xyXG5cclxuICAgIC8qIGRpcmVjdGl2ZSBjdXN0b21lciBuYW1lICovXHJcbiAgICB0aGlzLmN1c3RvbWVyID0ge1xyXG4gICAgICBuYW1lOiAnRXJpYyBDYW50b25hJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qIHRhYnMgKi9cclxuICAgICRzY29wZS50YWJzID0gW1xyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDEnLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMScgfSxcclxuICAgICAgeyB0aXRsZTonRHluYW1pYyBUaXRsZSAyJywgY29udGVudDonRHluYW1pYyBjb250ZW50IDInLCBkaXNhYmxlZDogdHJ1ZSB9XHJcbiAgICBdO1xyXG4gICAgICAgICBcclxuICAgIC8qIHR5cGVhaGVhZCAqL1xyXG4gICAgLyogcmV0dXJucyBsb2NhdGlvbiBmcm9tIHF1ZXJ5IGlucHV0ICovXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYXRpb24odmFsKSB7XHJcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvU3RvcFBvaW50L3NlYXJjaCcsIHtcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHF1ZXJ5OiB2YWwsXHJcbiAgICAgICAgICBtb2RlczogJ3R1YmUnXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXRjaGVzLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSBhc3luYycsIGl0ZW0pO1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICB9O1xyXG5cclxuICAgLy90eXBlYWhlYWQgZW5kXHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGVzdGluYXRpb25zJywgdGhpcy5kZXN0aW5hdGlvbnMpO1xyXG4gICAgICBqb3VybmV5UGxhbm5lckZhY3QucHJvbWlzZUpvdXJuZXlGZWVkKHRoaXMuZGVzdGluYXRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgc2VsZi5wcm9taXNlSm91cm5leSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHdpdGggam91cm5leScsIHJlcG9uc2UuZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuICAuZGlyZWN0aXZlKCdteUN1c3RvbWVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZW1wbGF0ZTogJ05hbWUge3sgIGpvdXJuZXlwbGFubmVyLmN1c3RvbWVyLm5hbWUgfX0nXHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG5cdC5mYWN0b3J5KCdqb3VybmV5UGxhbm5lckZhY3QnLCBqb3VybmV5UGxhbm5lckZhY3QpO1xyXG5cclxuXHRqb3VybmV5UGxhbm5lckZhY3QuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHRcclxuXHRmdW5jdGlvbiBqb3VybmV5UGxhbm5lckZhY3QoJGh0dHApIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9taXNlSm91cm5leUZlZWQ6IGZ1bmN0aW9uKGRlc3RpbmF0aW9ucykge1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBkZXN0aW5hdGlvbnMuZnJvbS5pY3NJZCArICcvdG8vJyArIGRlc3RpbmF0aW9ucy50by5pY3NJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHR9XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy9wb3N0cycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3Bvc3RzL3Bvc3RzLmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyOiAncG9zdHNDdHJsJyxcclxuICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICB9KTtcclxuICB9XSlcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHQuY29udHJvbGxlcigncG9zdHNDdHJsJywgcG9zdHNDdHJsKTtcclxuXHJcbiAgcG9zdHNDdHJsLiRpbmplY3QgPSBbJ3Bvc3RzJ107XHJcbiAgXHJcbiAgZnVuY3Rpb24gcG9zdHNDdHJsKHBvc3RzKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHBvc3RzLnBvc3RzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBzZWxmLnBvc3RzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHJcbiAgLmZhY3RvcnkoJ3Bvc3RzJywgcG9zdHMpO1xyXG4gIHBvc3RzLiRpbmplY3QgPSBbJyRodHRwJywgJ215Q29uZmlnJ107XHJcblxyXG4gIGZ1bmN0aW9uIHBvc3RzKCRodHRwLCBteUNvbmZpZykge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICBwb3N0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQb3N0cyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5zdGFyd2Fyc1RleHQnKVxyXG5cclxuXHQuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG5cdCAgJHJvdXRlUHJvdmlkZXIud2hlbignL3N0YXJ3YXJzJywge1xyXG5cdCAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvc3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmh0bWwnLFxyXG5cdCAgICBjb250cm9sbGVyOiAnc3RhcndhcnMnLFxyXG5cdCAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuXHQgIH0pO1xyXG5cdH1dKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdzdGFyd2FycycsIHN0YXJ3YXJzKTtcclxuXHJcblx0c3RhcndhcnMuJGluamVjdCA9IFsnYnlsaW5lQW5pbScsICckc2NvcGUnLCAnJGxvY2F0aW9uJ107XHJcblxyXG5cdGZ1bmN0aW9uIHN0YXJ3YXJzKGJ5bGluZSwgJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuXHRcdCRzY29wZS5ieWxpbmU7XHJcblx0XHQkc2NvcGUuYW5pbWF0aW9uRW5kID0gYW5pbWF0aW9uRW5kO1xyXG5cdFx0ZnVuY3Rpb24gYW5pbWF0aW9uRW5kKCl7XHJcblx0XHRcdGZ1bmN0aW9uIG15U2NyaXB0KCkgeyBcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnYW5pbSBpcyB3b3JraW5nIHdhaG9vbyEnLCAkbG9jYXRpb24ucGF0aCgpKTtcclxuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL3Rlcm1pbmFsdGV4dCcpO1xyXG5cdFx0XHRcdCRzY29wZS4kYXBwbHkoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFydGluJykuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBteVNjcmlwdCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHRcclxuXHQuc2VydmljZSgnYnlsaW5lQW5pbScsIGJ5bGluZUFuaW0pO1xyXG5cclxuXHRmdW5jdGlvbiBieWxpbmVBbmltKCl7IFxyXG5cclxuXHRcdC8qXHJcblx0XHRcdFRoZSBmb2xsb3dpbmcgSlMgdGFrZXMgaW4gdGhlIGJ5bGluZSBhbmQgc3BsaXRzIGl0IGludG8gbGV0dGVycywgZWFjaCBvbmUgd3JhcHBlZCBpbiBhIHNwYW4uIFdlIG5lZWQgdG8gY3JlYXRlIHRoZSBzcGFucyBhcyBub2Rlcywgd2UgY2FuJ3QganVzdCBhZGQgdGhlbSB0byB0aGUgSFRNTCB1c2luZyBpbm5lckhUTUwsIGFzIHRvIGRvIHNvIHdvdWxkIG1lYW4gdGhlIENTUyB3b24ndCBhZmZlY3QgdGhlIHNwYW4gYmVjYXVzZSBpdCBkb2Vzbid0IHJlY29nbmlzZSB0aGUgdGFnIGFzIGV4aXN0aW5nLiBJdCdzIGFuIG9sZCBwcm9ibGVtIHdlIHJ1biBpbnRvIHRpbWUgYW5kIGFnYWluLlxyXG5cdFx0Ki9cclxuXHJcblx0XHRcdHZhciBieWxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlsaW5lJyk7ICBcdC8vIEZpbmQgdGhlIEgyXHJcblx0XHRcdHZhciBieWxpbmVUZXh0ID0gYnlsaW5lLmlubmVySFRNTDtcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEdldCB0aGUgY29udGVudCBvZiB0aGUgSDJcclxuXHRcdFx0dmFyIGJ5bGluZUFyciA9IGJ5bGluZVRleHQuc3BsaXQoJycpO1x0XHRcdFx0XHRcdFx0XHRcdC8vIFNwbGl0IGNvbnRlbnQgaW50byBhcnJheVxyXG5cdFx0XHRieWxpbmUuaW5uZXJIVE1MID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEVtcHR5IGN1cnJlbnQgY29udGVudFxyXG5cclxuXHRcdFx0dmFyIHNwYW47XHRcdFx0XHRcdC8vIENyZWF0ZSB2YXJpYWJsZXMgdG8gY3JlYXRlIGVsZW1lbnRzXHJcblx0XHRcdHZhciBsZXR0ZXI7XHJcblxyXG5cdFx0XHRmb3IodmFyIGk9MDtpPGJ5bGluZUFyci5sZW5ndGg7aSsrKXtcdFx0XHRcdFx0XHRcdFx0XHQvLyBMb29wIGZvciBldmVyeSBsZXR0ZXJcclxuXHRcdFx0ICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHRcdFx0XHRcdC8vIENyZWF0ZSBhIDxzcGFuPiBlbGVtZW50XHJcblx0XHRcdCAgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnlsaW5lQXJyW2ldKTtcdC8vIENyZWF0ZSB0aGUgbGV0dGVyXHJcblx0XHRcdCAgaWYoYnlsaW5lQXJyW2ldID09ICcgJykge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBsZXR0ZXIgaXMgYSBzcGFjZS4uLlxyXG5cdFx0XHQgICAgYnlsaW5lLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdC8vIC4uLkFkZCB0aGUgc3BhY2Ugd2l0aG91dCBhIHNwYW5cclxuXHRcdFx0ICB9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3Bhbi5hcHBlbmRDaGlsZChsZXR0ZXIpO1x0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGV0dGVyIHRvIHRoZSBzcGFuXHJcblx0XHRcdCAgXHRieWxpbmUuYXBwZW5kQ2hpbGQoc3Bhbik7IFx0XHRcdFx0XHQvLyBBZGQgdGhlIHNwYW4gdG8gdGhlIGgyXHJcblx0XHRcdCAgfVxyXG5cdFx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvdGVybWluYWx0ZXh0Jywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvdGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5odG1sJyxcclxuICAgICAgY29udHJvbGxlcjogJ1Rlcm1pbmFsVGV4dEN0cmwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH0pO1xyXG4gIH1dKTtcclxuICBcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ1Rlcm1pbmFsVGV4dEN0cmwnLCBUZXJtaW5hbFRleHRDdHJsKTtcclxuXHJcbiAgVGVybWluYWxUZXh0Q3RybC4kaW5qZWN0ID0gWyd2aWV3MUZhY3QnLCAndGVybWluYWxUZXh0JywgJyRzY29wZScsICckdGltZW91dCcsICckbG9jYXRpb24nXTtcclxuXHJcbiAgZnVuY3Rpb24gVGVybWluYWxUZXh0Q3RybCh2aWV3MUZhY3QsIHRlcm1pbmFsVGV4dCwgJHNjb3BlLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgdGhpcy50ZXJtaW5hbFRleHQgPSB0ZXJtaW5hbFRleHQudGVybWluYWwoJy50ZXJtaW5hbCcpO1xyXG4gICAgICB2aWV3MUZhY3QucGFnZXMoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgc2VsZi5ob21lcGFnZSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWV3MUZhY3QgY29udHJvbGxlciBub3Qgd29ya2luZyAnLCByZWFzb24pO1xyXG4gICAgICB9KTtcclxuICAgICAgJHNjb3BlLiRvbigndGVybWluYWxUZXh0RmluaXNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Jyb2FkY2FzdCBoYXMgd29ya2VkJyk7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJHNjb3BlLnNldEhvbWVCdG4gPSB0cnVlO1xyXG4gICAgICAgIH0sIDIwMDApO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5wZWVrQnRuQ2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygncGVla2Fib28nKTtcclxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2Fib3V0Jyk7XHJcbiAgICAgIH1cclxuXHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuICBcclxuICAuZmFjdG9yeSgndGVybWluYWxUZXh0JywgdGVybWluYWx0ZXh0KTtcclxuICB0ZXJtaW5hbHRleHQuJGluamVjdCA9IFsnJHEnLCAnJGludGVydmFsJywgJyR0aW1lb3V0JywgJyRyb290U2NvcGUnXTtcclxuXHJcbiAgZnVuY3Rpb24gdGVybWluYWx0ZXh0KCRxLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkcm9vdFNjb3BlKSB7XHJcbiAgIFxyXG4gICAgdmFyIGRlbGF5ID0gMjAwMDtcclxuICAgIHZhciBpdGVyYXRvcjtcclxuICAgIHZhciBibGlua0xldHRlcnM7XHJcbiAgICB2YXIgYmxpbmtMZXR0ZXJzQ2xhc3M7XHJcbiAgICB2YXIgdGVybWluYWxUZXh0MTtcclxuICAgIHZhciBhbmltYXRpb25UZXh0O1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEFuaW1hdGVzIHRoZSBibGluayB0ZXh0XHJcbiAgICAgICAqIEBwYXJhbSBjbGFzcyBjb250YWluaW5nIHRoZSB0ZXh0IHRvIGFuaW1hdGUuXHJcbiAgICAgICAqICRzY29wZS4kZW1pdHMgdGVybWluYWxUZXh0RmluaXNoIGFmdGVyIGZ1bmN0aW9uIGZpbmlzaGVzLlxyXG4gICAgICAgKi9cclxuICAgIGZ1bmN0aW9uIHNldEJsaW5reSh0ZXh0KSB7IFxyXG5cclxuICAgICAgYmxpbmtMZXR0ZXJzQ2xhc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRleHQpO1xyXG4gICAgICBibGlua0xldHRlcnMgPSBibGlua0xldHRlcnNDbGFzcy5pbm5lckhUTUw7XHJcbiAgICAgIGFuaW1hdGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uVGV4dCcpO1xyXG4gICAgICBibGlua0xldHRlcnNDbGFzcy5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ0ZXJtaW5hbFRleHQxXCI+PC9zcGFuPjxzcGFuIGNsYXNzPVwiYmxpbmtcIj4mI3g3Yzs8L3NwYW4+JztcclxuXHJcbiAgICAgIHZhciBibGlua1BpcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxpbmsnKTtcclxuXHJcbiAgICAgIHZhciBibGluayA9ICRpbnRlcnZhbCggZnVuY3Rpb24oKSB7IGlmIChibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9PSAwIHx8IGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID09ICcnICkgeyBibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9IDEgfSBlbHNlIHtibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9IDAgfX0sIDYwMCk7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQW5pbWF0ZXMgdGhyb3VnaCB0aGUgc3RyaW5nLiBTZXRzIHRoZSBzZXRUaW1lb3V0IGZ1bmN0aW9uLlxyXG4gICAgICAgKi9cclxuXHJcbiAgICAgICBmdW5jdGlvbiBhbmltYXRlQmxpbmsoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gYmxpbmtMZXR0ZXJzLmxlbmd0aCsxOyBpKyspIHtcclxuICAgICAgICAgIGlmKCBpID09IGJsaW5rTGV0dGVycy5sZW5ndGggKyAxICkge1xyXG4gICAgICAgICAgICBkZWxheSA9IGRlbGF5ICsgMTAwMDtcclxuICAgICAgICAgICAgc2V0Q2FsbEJhY2tUaW1lT3V0KGRlbGF5KTsgXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGVsYXkgPSBkZWxheSArIDUwMDtcclxuICAgICAgICAgIHNldFRoZVRpbWVvdXQoaSxkZWxheSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIFNldHMgY2FsbGJhY2sgdG8gYW5pbWF0ZUJsaW5rIGZ1bmN0aW9uXHJcbiAgICAgICAqL1xyXG4gICAgICAgZnVuY3Rpb24gc2V0Q2FsbEJhY2tUaW1lT3V0KGRlbGF5KSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB0ZXJtaW5hbFRleHQxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlcm1pbmFsVGV4dDEnKTtcclxuICAgICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS50b3AgPSAnNTAlJztcclxuICAgICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUubGVmdCA9ICc1MCUnO1xyXG4gICAgICAgICAgdGVybWluYWxUZXh0MS5jbGFzc05hbWUgKz0gJyBjZW50ZXJUZXh0QWZ0ZXJBbmltJztcclxuICAgICAgICAgIGJsaW5rUGlwZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJsaW5rUGlwZSk7XHJcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3Rlcm1pbmFsVGV4dEZpbmlzaCcpO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBJdGVyYXRvcnMgdGhlIHNldFRpbWVvdXQgZm9yIGFuaW1hdGlvbi5cclxuICAgICAgICovXHJcbiAgICAgICBmdW5jdGlvbiBzZXRUaGVUaW1lb3V0KGl0ZXJhdG9yLCBkZWxheSkge1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVybWluYWxUZXh0MScpLmlubmVySFRNTCA9IGJsaW5rTGV0dGVycy5zdWJzdHIoMCwgaXRlcmF0b3IpO1xyXG4gICAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgIGFuaW1hdGVCbGluaygpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZXJtaW5hbDogZnVuY3Rpb24odGV4dCkge1xyXG4gICAgICAgIHNldEJsaW5reSh0ZXh0KVxyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXHJcblxyXG4gIC5mYWN0b3J5KCd2aWV3MUZhY3QnLCB2aWV3MUZhY3QpO1xyXG5cclxuICB2aWV3MUZhY3QuJGluamVjdCA9IFsnJGh0dHAnLCAnbXlDb25maWcnXTtcclxuXHJcbiAgZnVuY3Rpb24gdmlldzFGYWN0KCRodHRwLCBteUNvbmZpZykge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5ld01lc3NhZ2U6ICdub29vbycsXHJcblxyXG4gICAgICBwYWdlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQYWdlcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC50dWJlc3RhdHVzZXMnKVxyXG5cclxuICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvdHViZXN0YXR1c2VzJywge1xyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3R1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuaHRtbCcsXHJcbiAgICAgICAgICBjb250cm9sbGVyOiAndHViZXN0YXR1c2VzQ3RybCcsXHJcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICB9KVxyXG4gIH1dKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5jb250cm9sbGVyKCd0dWJlc3RhdHVzZXNDdHJsJywgdHViZXN0YXR1c2VzQ3RybCk7XHJcblxyXG4gIHR1YmVzdGF0dXNlc0N0cmwuJGluamVjdCA9IFsndHViZXN0YXR1c2VzVGZsJ107XHJcblxyXG4gIGZ1bmN0aW9uIHR1YmVzdGF0dXNlc0N0cmwodHViZXN0YXR1c2VzVGZsKSB7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gJ2hlbGxvbyBtb25rZXknO1xyXG4gICAgdGhpcy52aWV3TXNnID0gdHViZXN0YXR1c2VzVGZsLm1lc3NhZ2U7XHJcblxyXG4gICAgICB0dWJlc3RhdHVzZXNUZmwudGZsKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHNlbGYudGZsID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcclxuXHJcbiAgLmZhY3RvcnkoJ3R1YmVzdGF0dXNlc1RmbCcsIHR1YmVzdGF0dXNlc1RmbCk7XHJcblxyXG4gIHR1YmVzdGF0dXNlc1RmbC4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cclxuICBmdW5jdGlvbiB0dWJlc3RhdHVzZXNUZmwoJGh0dHApIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlOiAnc29tZWJvZHkgc3RvcCBtZSEnLFxyXG5cclxuICAgICAgdGZsIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9saW5lL21vZGUvdHViZS9zdGF0dXMnLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgYXBpX2lkOiAnMWEzZmZiZDInLFxyXG4gICAgICAgICAgICBhcGlfa2V5OiAnMmFkZmIwMjAwMWFkZmVmYTA2OGY3YTc0ODYyODU0ZTYnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
