'use strict';

(function () {
	'use strict', angular.module('myApp.about').config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/about', {
			controller: 'aboutCtrl',
			controllerAs: 'vm',
			templateUrl: 'components/about/about.html'
		});
	}]);
})();
'use strict';

(function () {
	'use strict', angular.module('myApp.about').controller('aboutCtrl', aboutCtrl);

	aboutCtrl.$inject = ['pages'];

	function aboutCtrl(pages) {
		var self = this;
		pages.getPages().then(function (response) {
			self.pages = response.data;
		}, function (data) {
			console.log('pages api failed ', data);
			self.error = 'getPages has thrown an error';
		});
		this.message = "all is good";
	}
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.about').factory('pages', pages);
  pages.$inject = ['$q', '$http', 'myConfig'];

  function pages($q, $http, myConfig) {

    var service = {};

    service.getPages = function getPages() {
      var deferred = $q.defer();

      $http.get(myConfig.wordpressPages).success(function (data) {
        deferred.resolve(data);
      }).error(function () {
        deferred.reject();
      });

      return deferred.promise;
    };

    return service;
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.posts').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/posts', {
      templateUrl: 'components/posts/posts.html',
      controller: 'postsCtrl',
      controllerAs: 'vm'
    });
  }]);
})();
'use strict';

(function () {
  'use strict', angular.module('myApp.posts').controller('postsCtrl', postsCtrl);

  postsCtrl.$inject = ['posts'];

  function postsCtrl(posts) {
    var self = this;
    posts.posts().then(function (response) {
      self.posts = response.data;
    }, function (data) {
      console.log(data);
    });
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.posts').factory('posts', posts);
  posts.$inject = ['$http', 'myConfig'];

  function posts($http, myConfig) {

    return {

      posts: function posts() {
        return $http.get(myConfig.wordpressPosts);
      }

    };
  }
})();
'use strict';

(function () {
	'use strict';

	angular.module('myApp.starwarsText').config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/starwars', {
			templateUrl: 'components/starwars-text-anim/starwars.html',
			controller: 'starwars',
			controllerAs: 'vm'
		});
	}]);
})();
'use strict';

(function () {
	'use strict';

	angular.module('myApp.starwarsText').controller('starwars', starwars);

	starwars.$inject = ['bylineAnim', '$scope', '$location'];

	function starwars(byline, $scope, $location) {
		$scope.byline;
		$scope.animationEnd = animationEnd;
		function animationEnd() {
			function myScript() {
				console.log('anim is working wahooo!', $location.path());
				$location.path('/terminaltext');
				$scope.$apply();
			}
			document.querySelector('.martin').addEventListener("animationend", myScript);
		}
	}
})();
'use strict';

(function () {
	'use strict';

	angular.module('myApp.starwarsText').service('bylineAnim', bylineAnim);

	function bylineAnim() {

		/*
  	The following JS takes in the byline and splits it into letters, each one wrapped in a span. We need to create the spans as nodes, we can't just add them to the HTML using innerHTML, as to do so would mean the CSS won't affect the span because it doesn't recognise the tag as existing. It's an old problem we run into time and again.
  */

		var byline = document.getElementById('byline'); // Find the H2
		var bylineText = byline.innerHTML; // Get the content of the H2
		var bylineArr = bylineText.split(''); // Split content into array
		byline.innerHTML = ''; // Empty current content

		var span; // Create variables to create elements
		var letter;

		for (var i = 0; i < bylineArr.length; i++) {
			// Loop for every letter
			span = document.createElement("span"); // Create a <span> element
			letter = document.createTextNode(bylineArr[i]); // Create the letter
			if (bylineArr[i] == ' ') {
				// If the letter is a space...
				byline.appendChild(letter); // ...Add the space without a span
			} else {
					span.appendChild(letter); // Add the letter to the span
					byline.appendChild(span); // Add the span to the h2
				}
		}
	}
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.terminaltext').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/terminaltext', {
      templateUrl: 'components/terminaltext/terminaltext.html',
      controller: 'TerminalTextCtrl',
      controllerAs: 'vm'
    });
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.terminaltext').controller('TerminalTextCtrl', TerminalTextCtrl);

  TerminalTextCtrl.$inject = ['view1Fact', 'terminalText', '$scope', '$timeout', '$location'];

  function TerminalTextCtrl(view1Fact, terminalText, $scope, $timeout, $location) {
    var self = this;
    var jimbo = 'something';
    this.terminalText = terminalText.terminal('.terminal');
    view1Fact.pages().then(function (response) {
      self.homepage = response.data;
    }, function (reason) {
      console.log('view1Fact controller not working ', reason);
    });
    $scope.$on('terminalTextFinish', function () {
      console.log('broadcast has worked');
      $timeout(function () {
        $scope.setHomeBtn = true;
      }, 2000);
    });
    this.peekBtnClick = function () {
      console.log('peekaboo');
      $location.path('/about');
    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.terminaltext').factory('terminalText', terminaltext);
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

      var blink = $interval(function () {
        if (blinkPipe.style.opacity == 0 || blinkPipe.style.opacity == '') {
          blinkPipe.style.opacity = 1;
        } else {
          blinkPipe.style.opacity = 0;
        }
      }, 600);

      /**
       * Animates through the string. Sets the setTimeout function.
       */

      function animateBlink() {
        for (var i = 1; i <= blinkLetters.length + 1; i++) {
          if (i == blinkLetters.length + 1) {
            delay = delay + 1000;
            setCallBackTimeOut(delay);
          } else {
            delay = delay + 500;
            setTheTimeout(i, delay);
          }
        }
      }

      /**
       * Sets callback to animateBlink function
       */
      function setCallBackTimeOut(delay) {
        $timeout(function () {
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
        $timeout(function () {
          document.querySelector('.terminalText1').innerHTML = blinkLetters.substr(0, iterator);
        }, delay);
      }

      animateBlink();
    }

    return {
      terminal: function terminal(text) {
        setBlinky(text);
      }

    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.terminaltext').factory('view1Fact', view1Fact);

  view1Fact.$inject = ['$http', 'myConfig'];

  function view1Fact($http, myConfig) {

    return {
      newMessage: 'noooo',

      pages: function pages() {
        return $http.get(myConfig.wordpressPages);
      }

    };
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.tubestatuses').config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/tubestatuses', {
      templateUrl: 'components/tubestatuses/tubestatuses.html',
      controller: 'tubestatusesCtrl',
      controllerAs: 'vm'
    });
  }]);
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.tubestatuses').controller('tubestatusesCtrl', tubestatusesCtrl);

  tubestatusesCtrl.$inject = ['tubestatusesTfl'];

  function tubestatusesCtrl(tubestatusesTfl) {

    var self = this;
    this.message = 'helloo monkey';
    this.viewMsg = tubestatusesTfl.message;

    tubestatusesTfl.tfl().then(function (response) {
      self.tfl = response.data;
    }, function (data) {
      console.log(data);
    });
  }
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.tubestatuses').factory('tubestatusesTfl', tubestatusesTfl);

  tubestatusesTfl.$inject = ['$http'];

  function tubestatusesTfl($http) {

    return {
      message: 'somebody stop me!',

      tfl: function tfl() {
        return $http.get('https://api.tfl.gov.uk/line/mode/tube/status', {
          params: {
            api_id: '1a3ffbd2',
            api_key: '2adfb02001adfefa068f7a74862854e6'
          }
        });
      }
    };
  }
})();
'use strict';

(function () {
	'use strict', angular.module('myApp.journeyplanner').config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/journeyplanner', {
			controller: 'journeyPlanner',
			templateUrl: 'components/journeyplanner/journeyplanner.html',
			controllerAs: 'vm'
		});
	}]);
})();
'use strict';

(function () {
  'use strict', angular.module('myApp.journeyplanner').controller('journeyPlanner', journeyPlanner);

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
    };

    /* tabs */
    $scope.tabs = [{ title: 'Dynamic Title 1', content: 'Dynamic content 1' }, { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }];

    /* typeahead */
    /* returns location from query input */

    function getLocation(val) {
      return $http.get('https://api.tfl.gov.uk/StopPoint/search', {
        params: {
          query: val,
          modes: 'tube'
        }
      }).then(function (response) {
        return response.data.matches.map(function (item) {
          console.log('there async', item);
          return item;
        });
      });
    };

    //typeahead end

    function update() {
      console.log('destinations', this.destinations);
      journeyPlannerFact.promiseJourneyFeed(this.destinations).then(function (response) {
        self.promiseJourney = response.data;
      }, function (response) {
        console.log('error with journey', reponse.data);
      });
    }
  }
})();
'use strict';

(function () {
  'use strict', angular.module('myApp.journeyplanner').directive('myCustomer', function () {
    return {
      template: 'Name {{  journeyplanner.customer.name }}'
    };
  });
})();
'use strict';

(function () {
  'use strict', angular.module('myApp.journeyplanner').factory('journeyPlannerFact', journeyPlannerFact);

  journeyPlannerFact.$inject = ['$http'];

  function journeyPlannerFact($http) {
    return {
      promiseJourneyFeed: function promiseJourneyFeed(destinations) {
        return $http.get('https://api.tfl.gov.uk/journey/journeyresults/' + destinations.from.icsId + '/to/' + destinations.to.icsId);
      }
    };
  }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0L2Fib3V0LmNvbmZpZy5qcyIsImFib3V0L2Fib3V0LmNvbnRyb2xsZXIuanMiLCJhYm91dC9hYm91dC5mYWN0b3J5LmpzIiwicG9zdHMvcG9zdHMuY29uZmlnLmpzIiwicG9zdHMvcG9zdHMuY29udHJvbGxlci5qcyIsInBvc3RzL3Bvc3RzLmZhY3RvcnkuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29uZmlnLmpzIiwic3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmNvbnRyb2xsZXIuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuc2VydmljZS5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuY29uZmlnLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb250cm9sbGVyLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5mYWN0b3J5LnRleHQuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudmlldzFmYWN0LmpzIiwidHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5jb25maWcuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbnRyb2xsZXIuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmZhY3RvcnkuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5jb25maWcuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5jb250cm9sbGVyLmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuZGlyZWN0aXZlLmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBVztBQUNYLGFBQVksRUFFWixPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUU1QixNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLGNBQWMs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QUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLFdBQVMsa0JBQWtCLENBQUMsS0FBSyxFQUFFO0FBQzlCLFdBQU87QUFDTCx3QkFBa0IsRUFBRSw0QkFBUyxZQUFZLEVBQUU7QUFDekMsZUFBTyxLQUFLLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sR0FBRyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQy9IO0tBQ0YsQ0FBQTtHQUNIO0NBRUgsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcclxuXHJcblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdCRyb3V0ZVByb3ZpZGVyXHJcblx0XHRcdC53aGVuKCcvYWJvdXQnLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCcsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9hYm91dC9hYm91dC5odG1sJ1xyXG5cdFx0XHR9KVxyXG5cdH1dKTtcclxuXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5hYm91dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdhYm91dEN0cmwnLCBhYm91dEN0cmwpXHJcblxyXG5cdGFib3V0Q3RybC4kaW5qZWN0ID0gWydwYWdlcyddO1xyXG5cclxuXHRmdW5jdGlvbiBhYm91dEN0cmwocGFnZXMpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHBhZ2VzLmdldFBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRzZWxmLnBhZ2VzID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3BhZ2VzIGFwaSBmYWlsZWQgJywgZGF0YSk7XHJcblx0XHRcdHNlbGYuZXJyb3IgPSAnZ2V0UGFnZXMgaGFzIHRocm93biBhbiBlcnJvcic7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMubWVzc2FnZSA9IFwiYWxsIGlzIGdvb2RcIjtcclxuXHR9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5hYm91dCcpXHJcblxyXG4gIC5mYWN0b3J5KCdwYWdlcycsIHBhZ2VzKTtcclxuICBwYWdlcy4kaW5qZWN0ID0gWyckcScsICckaHR0cCcsICdteUNvbmZpZyddO1xyXG5cclxuICBmdW5jdGlvbiBwYWdlcygkcSwgJGh0dHAsIG15Q29uZmlnKSB7XHJcblxyXG4gIHZhciBzZXJ2aWNlID0ge307XHJcblxyXG4gIHNlcnZpY2UuZ2V0UGFnZXMgPSBmdW5jdGlvbiBnZXRQYWdlcygpIHtcclxuICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XHJcbiAgICBcclxuICAgICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQYWdlcylcclxuICAgIC5zdWNjZXNzKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgZGVmZXJyZWQucmVzb2x2ZShkYXRhKTtcclxuICAgIH0pXHJcbiAgICAuZXJyb3IoZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlZmVycmVkLnJlamVjdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7IFxyXG4gIH07XHJcblxyXG4gIHJldHVybiBzZXJ2aWNlOyBcclxuICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy9wb3N0cycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3Bvc3RzL3Bvc3RzLmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyOiAncG9zdHNDdHJsJyxcclxuICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICB9KTtcclxuICB9XSlcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHQuY29udHJvbGxlcigncG9zdHNDdHJsJywgcG9zdHNDdHJsKTtcclxuXHJcbiAgcG9zdHNDdHJsLiRpbmplY3QgPSBbJ3Bvc3RzJ107XHJcbiAgXHJcbiAgZnVuY3Rpb24gcG9zdHNDdHJsKHBvc3RzKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHBvc3RzLnBvc3RzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBzZWxmLnBvc3RzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHJcbiAgLmZhY3RvcnkoJ3Bvc3RzJywgcG9zdHMpO1xyXG4gIHBvc3RzLiRpbmplY3QgPSBbJyRodHRwJywgJ215Q29uZmlnJ107XHJcblxyXG4gIGZ1bmN0aW9uIHBvc3RzKCRodHRwLCBteUNvbmZpZykge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICBwb3N0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQb3N0cyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5zdGFyd2Fyc1RleHQnKVxyXG5cclxuXHQuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG5cdCAgJHJvdXRlUHJvdmlkZXIud2hlbignL3N0YXJ3YXJzJywge1xyXG5cdCAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvc3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmh0bWwnLFxyXG5cdCAgICBjb250cm9sbGVyOiAnc3RhcndhcnMnLFxyXG5cdCAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuXHQgIH0pO1xyXG5cdH1dKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdzdGFyd2FycycsIHN0YXJ3YXJzKTtcclxuXHJcblx0c3RhcndhcnMuJGluamVjdCA9IFsnYnlsaW5lQW5pbScsICckc2NvcGUnLCAnJGxvY2F0aW9uJ107XHJcblxyXG5cdGZ1bmN0aW9uIHN0YXJ3YXJzKGJ5bGluZSwgJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuXHRcdCRzY29wZS5ieWxpbmU7XHJcblx0XHQkc2NvcGUuYW5pbWF0aW9uRW5kID0gYW5pbWF0aW9uRW5kO1xyXG5cdFx0ZnVuY3Rpb24gYW5pbWF0aW9uRW5kKCl7XHJcblx0XHRcdGZ1bmN0aW9uIG15U2NyaXB0KCkgeyBcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnYW5pbSBpcyB3b3JraW5nIHdhaG9vbyEnLCAkbG9jYXRpb24ucGF0aCgpKTtcclxuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL3Rlcm1pbmFsdGV4dCcpO1xyXG5cdFx0XHRcdCRzY29wZS4kYXBwbHkoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFydGluJykuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBteVNjcmlwdCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHRcclxuXHQuc2VydmljZSgnYnlsaW5lQW5pbScsIGJ5bGluZUFuaW0pO1xyXG5cclxuXHRmdW5jdGlvbiBieWxpbmVBbmltKCl7IFxyXG5cclxuXHRcdC8qXHJcblx0XHRcdFRoZSBmb2xsb3dpbmcgSlMgdGFrZXMgaW4gdGhlIGJ5bGluZSBhbmQgc3BsaXRzIGl0IGludG8gbGV0dGVycywgZWFjaCBvbmUgd3JhcHBlZCBpbiBhIHNwYW4uIFdlIG5lZWQgdG8gY3JlYXRlIHRoZSBzcGFucyBhcyBub2Rlcywgd2UgY2FuJ3QganVzdCBhZGQgdGhlbSB0byB0aGUgSFRNTCB1c2luZyBpbm5lckhUTUwsIGFzIHRvIGRvIHNvIHdvdWxkIG1lYW4gdGhlIENTUyB3b24ndCBhZmZlY3QgdGhlIHNwYW4gYmVjYXVzZSBpdCBkb2Vzbid0IHJlY29nbmlzZSB0aGUgdGFnIGFzIGV4aXN0aW5nLiBJdCdzIGFuIG9sZCBwcm9ibGVtIHdlIHJ1biBpbnRvIHRpbWUgYW5kIGFnYWluLlxyXG5cdFx0Ki9cclxuXHJcblx0XHRcdHZhciBieWxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlsaW5lJyk7ICBcdC8vIEZpbmQgdGhlIEgyXHJcblx0XHRcdHZhciBieWxpbmVUZXh0ID0gYnlsaW5lLmlubmVySFRNTDtcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEdldCB0aGUgY29udGVudCBvZiB0aGUgSDJcclxuXHRcdFx0dmFyIGJ5bGluZUFyciA9IGJ5bGluZVRleHQuc3BsaXQoJycpO1x0XHRcdFx0XHRcdFx0XHRcdC8vIFNwbGl0IGNvbnRlbnQgaW50byBhcnJheVxyXG5cdFx0XHRieWxpbmUuaW5uZXJIVE1MID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEVtcHR5IGN1cnJlbnQgY29udGVudFxyXG5cclxuXHRcdFx0dmFyIHNwYW47XHRcdFx0XHRcdC8vIENyZWF0ZSB2YXJpYWJsZXMgdG8gY3JlYXRlIGVsZW1lbnRzXHJcblx0XHRcdHZhciBsZXR0ZXI7XHJcblxyXG5cdFx0XHRmb3IodmFyIGk9MDtpPGJ5bGluZUFyci5sZW5ndGg7aSsrKXtcdFx0XHRcdFx0XHRcdFx0XHQvLyBMb29wIGZvciBldmVyeSBsZXR0ZXJcclxuXHRcdFx0ICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHRcdFx0XHRcdC8vIENyZWF0ZSBhIDxzcGFuPiBlbGVtZW50XHJcblx0XHRcdCAgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnlsaW5lQXJyW2ldKTtcdC8vIENyZWF0ZSB0aGUgbGV0dGVyXHJcblx0XHRcdCAgaWYoYnlsaW5lQXJyW2ldID09ICcgJykge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBsZXR0ZXIgaXMgYSBzcGFjZS4uLlxyXG5cdFx0XHQgICAgYnlsaW5lLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdC8vIC4uLkFkZCB0aGUgc3BhY2Ugd2l0aG91dCBhIHNwYW5cclxuXHRcdFx0ICB9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3Bhbi5hcHBlbmRDaGlsZChsZXR0ZXIpO1x0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGV0dGVyIHRvIHRoZSBzcGFuXHJcblx0XHRcdCAgXHRieWxpbmUuYXBwZW5kQ2hpbGQoc3Bhbik7IFx0XHRcdFx0XHQvLyBBZGQgdGhlIHNwYW4gdG8gdGhlIGgyXHJcblx0XHRcdCAgfVxyXG5cdFx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvdGVybWluYWx0ZXh0Jywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvdGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5odG1sJyxcclxuICAgICAgY29udHJvbGxlcjogJ1Rlcm1pbmFsVGV4dEN0cmwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH0pO1xyXG4gIH1dKTtcclxuICBcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ1Rlcm1pbmFsVGV4dEN0cmwnLCBUZXJtaW5hbFRleHRDdHJsKTtcclxuXHJcbiAgVGVybWluYWxUZXh0Q3RybC4kaW5qZWN0ID0gWyd2aWV3MUZhY3QnLCAndGVybWluYWxUZXh0JywgJyRzY29wZScsICckdGltZW91dCcsICckbG9jYXRpb24nXTtcclxuXHJcbiAgZnVuY3Rpb24gVGVybWluYWxUZXh0Q3RybCh2aWV3MUZhY3QsIHRlcm1pbmFsVGV4dCwgJHNjb3BlLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGxldCBqaW1ibyA9ICdzb21ldGhpbmcnO1xyXG4gICAgICB0aGlzLnRlcm1pbmFsVGV4dCA9IHRlcm1pbmFsVGV4dC50ZXJtaW5hbCgnLnRlcm1pbmFsJyk7XHJcbiAgICAgIHZpZXcxRmFjdC5wYWdlcygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLmhvbWVwYWdlID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZpZXcxRmFjdCBjb250cm9sbGVyIG5vdCB3b3JraW5nICcsIHJlYXNvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkc2NvcGUuJG9uKCd0ZXJtaW5hbFRleHRGaW5pc2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYnJvYWRjYXN0IGhhcyB3b3JrZWQnKTtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkc2NvcGUuc2V0SG9tZUJ0biA9IHRydWU7XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnBlZWtCdG5DbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwZWVrYWJvbycpO1xyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYWJvdXQnKTtcclxuICAgICAgfVxyXG5cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnKVxyXG4gIFxyXG4gIC5mYWN0b3J5KCd0ZXJtaW5hbFRleHQnLCB0ZXJtaW5hbHRleHQpO1xyXG4gIHRlcm1pbmFsdGV4dC4kaW5qZWN0ID0gWyckcScsICckaW50ZXJ2YWwnLCAnJHRpbWVvdXQnLCAnJHJvb3RTY29wZSddO1xyXG5cclxuICBmdW5jdGlvbiB0ZXJtaW5hbHRleHQoJHEsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRyb290U2NvcGUpIHtcclxuICAgXHJcbiAgICB2YXIgZGVsYXkgPSAyMDAwO1xyXG4gICAgdmFyIGl0ZXJhdG9yO1xyXG4gICAgdmFyIGJsaW5rTGV0dGVycztcclxuICAgIHZhciBibGlua0xldHRlcnNDbGFzcztcclxuICAgIHZhciB0ZXJtaW5hbFRleHQxO1xyXG4gICAgdmFyIGFuaW1hdGlvblRleHQ7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQW5pbWF0ZXMgdGhlIGJsaW5rIHRleHRcclxuICAgICAgICogQHBhcmFtIGNsYXNzIGNvbnRhaW5pbmcgdGhlIHRleHQgdG8gYW5pbWF0ZS5cclxuICAgICAgICogJHNjb3BlLiRlbWl0cyB0ZXJtaW5hbFRleHRGaW5pc2ggYWZ0ZXIgZnVuY3Rpb24gZmluaXNoZXMuXHJcbiAgICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2V0Qmxpbmt5KHRleHQpIHsgXHJcblxyXG4gICAgICBibGlua0xldHRlcnNDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGV4dCk7XHJcbiAgICAgIGJsaW5rTGV0dGVycyA9IGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTDtcclxuICAgICAgYW5pbWF0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb25UZXh0Jyk7XHJcbiAgICAgIGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRlcm1pbmFsVGV4dDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJibGlua1wiPiYjeDdjOzwvc3Bhbj4nO1xyXG5cclxuICAgICAgdmFyIGJsaW5rUGlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibGluaycpO1xyXG5cclxuICAgICAgdmFyIGJsaW5rID0gJGludGVydmFsKCBmdW5jdGlvbigpIHsgaWYgKGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID09IDAgfHwgYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPT0gJycgKSB7IGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMSB9IGVsc2Uge2JsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMCB9fSwgNjAwKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBBbmltYXRlcyB0aHJvdWdoIHRoZSBzdHJpbmcuIFNldHMgdGhlIHNldFRpbWVvdXQgZnVuY3Rpb24uXHJcbiAgICAgICAqL1xyXG5cclxuICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVCbGluaygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBibGlua0xldHRlcnMubGVuZ3RoKzE7IGkrKykge1xyXG4gICAgICAgICAgaWYoIGkgPT0gYmxpbmtMZXR0ZXJzLmxlbmd0aCArIDEgKSB7XHJcbiAgICAgICAgICAgIGRlbGF5ID0gZGVsYXkgKyAxMDAwO1xyXG4gICAgICAgICAgICBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpOyBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkZWxheSA9IGRlbGF5ICsgNTAwO1xyXG4gICAgICAgICAgc2V0VGhlVGltZW91dChpLGRlbGF5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogU2V0cyBjYWxsYmFjayB0byBhbmltYXRlQmxpbmsgZnVuY3Rpb25cclxuICAgICAgICovXHJcbiAgICAgICBmdW5jdGlvbiBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpIHtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRlcm1pbmFsVGV4dDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVybWluYWxUZXh0MScpO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLnRvcCA9ICc1MCUnO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5sZWZ0ID0gJzUwJSc7XHJcbiAgICAgICAgICB0ZXJtaW5hbFRleHQxLmNsYXNzTmFtZSArPSAnIGNlbnRlclRleHRBZnRlckFuaW0nO1xyXG4gICAgICAgICAgYmxpbmtQaXBlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmxpbmtQaXBlKTtcclxuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndGVybWluYWxUZXh0RmluaXNoJyk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEl0ZXJhdG9ycyB0aGUgc2V0VGltZW91dCBmb3IgYW5pbWF0aW9uLlxyXG4gICAgICAgKi9cclxuICAgICAgIGZ1bmN0aW9uIHNldFRoZVRpbWVvdXQoaXRlcmF0b3IsIGRlbGF5KSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXJtaW5hbFRleHQxJykuaW5uZXJIVE1MID0gYmxpbmtMZXR0ZXJzLnN1YnN0cigwLCBpdGVyYXRvcik7XHJcbiAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgYW5pbWF0ZUJsaW5rKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRlcm1pbmFsOiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgc2V0Qmxpbmt5KHRleHQpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmZhY3RvcnkoJ3ZpZXcxRmFjdCcsIHZpZXcxRmFjdCk7XHJcblxyXG4gIHZpZXcxRmFjdC4kaW5qZWN0ID0gWyckaHR0cCcsICdteUNvbmZpZyddO1xyXG5cclxuICBmdW5jdGlvbiB2aWV3MUZhY3QoJGh0dHAsIG15Q29uZmlnKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmV3TWVzc2FnZTogJ25vb29vJyxcclxuXHJcbiAgICAgIHBhZ2VzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLndoZW4oJy90dWJlc3RhdHVzZXMnLCB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvdHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5odG1sJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICd0dWJlc3RhdHVzZXNDdHJsJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH0pXHJcbiAgfV0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ3R1YmVzdGF0dXNlc0N0cmwnLCB0dWJlc3RhdHVzZXNDdHJsKTtcclxuXHJcbiAgdHViZXN0YXR1c2VzQ3RybC4kaW5qZWN0ID0gWyd0dWJlc3RhdHVzZXNUZmwnXTtcclxuXHJcbiAgZnVuY3Rpb24gdHViZXN0YXR1c2VzQ3RybCh0dWJlc3RhdHVzZXNUZmwpIHtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSAnaGVsbG9vIG1vbmtleSc7XHJcbiAgICB0aGlzLnZpZXdNc2cgPSB0dWJlc3RhdHVzZXNUZmwubWVzc2FnZTtcclxuXHJcbiAgICAgIHR1YmVzdGF0dXNlc1RmbC50ZmwoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgc2VsZi50ZmwgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC50dWJlc3RhdHVzZXMnKVxyXG5cclxuICAuZmFjdG9yeSgndHViZXN0YXR1c2VzVGZsJywgdHViZXN0YXR1c2VzVGZsKTtcclxuXHJcbiAgdHViZXN0YXR1c2VzVGZsLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG4gIGZ1bmN0aW9uIHR1YmVzdGF0dXNlc1RmbCgkaHR0cCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzb21lYm9keSBzdG9wIG1lIScsXHJcblxyXG4gICAgICB0ZmwgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2xpbmUvbW9kZS90dWJlL3N0YXR1cycsIHtcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBhcGlfaWQ6ICcxYTNmZmJkMicsXHJcbiAgICAgICAgICAgIGFwaV9rZXk6ICcyYWRmYjAyMDAxYWRmZWZhMDY4ZjdhNzQ4NjI4NTRlNidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG5cdC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblx0ICAkcm91dGVQcm92aWRlclxyXG5cdCAgICAud2hlbignL2pvdXJuZXlwbGFubmVyJywge1xyXG5cdCAgICAgIGNvbnRyb2xsZXI6ICdqb3VybmV5UGxhbm5lcicsXHJcblx0ICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2pvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmh0bWwnLFxyXG5cdCAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG5cdCAgICB9KVxyXG5cdH1dKTtcclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuICAuY29udHJvbGxlcignam91cm5leVBsYW5uZXInLCBqb3VybmV5UGxhbm5lcik7XHJcblxyXG4gIGpvdXJuZXlQbGFubmVyLiRpbmplY3QgPSBbJ2pvdXJuZXlQbGFubmVyRmFjdCcsICckc2NvcGUnLCAnJGxvZycsICckaHR0cCddO1xyXG5cclxuICBmdW5jdGlvbiBqb3VybmV5UGxhbm5lcihqb3VybmV5UGxhbm5lckZhY3QsICRzY29wZSwgJGxvZywgJGh0dHApIHtcclxuICAgXHJcbiAgICAkc2NvcGUucGVyc29uID0gJ01pa2V5cyc7XHJcbiAgICAkc2NvcGUuZ2V0TG9jYXRpb24gPSBnZXRMb2NhdGlvbjtcclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5kZXN0aW5hdGlvbnM7XHJcbiAgICB0aGlzLnByb21pc2VKb3VybmV5ID0gJyc7XHJcblxyXG4gICAgLyogZGlyZWN0aXZlIGN1c3RvbWVyIG5hbWUgKi9cclxuICAgIHRoaXMuY3VzdG9tZXIgPSB7XHJcbiAgICAgIG5hbWU6ICdFcmljIENhbnRvbmEnXHJcbiAgICB9XHJcblxyXG4gICAgLyogdGFicyAqL1xyXG4gICAgJHNjb3BlLnRhYnMgPSBbXHJcbiAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgIF07XHJcbiAgICAgICAgIFxyXG4gICAgLyogdHlwZWFoZWFkICovXHJcbiAgICAvKiByZXR1cm5zIGxvY2F0aW9uIGZyb20gcXVlcnkgaW5wdXQgKi9cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRMb2NhdGlvbih2YWwpIHtcclxuICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9TdG9wUG9pbnQvc2VhcmNoJywge1xyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgcXVlcnk6IHZhbCxcclxuICAgICAgICAgIG1vZGVzOiAndHViZSdcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hdGNoZXMubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlIGFzeW5jJywgaXRlbSk7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgIH07XHJcblxyXG4gICAvL3R5cGVhaGVhZCBlbmRcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZXN0aW5hdGlvbnMnLCB0aGlzLmRlc3RpbmF0aW9ucyk7XHJcbiAgICAgIGpvdXJuZXlQbGFubmVyRmFjdC5wcm9taXNlSm91cm5leUZlZWQodGhpcy5kZXN0aW5hdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLnByb21pc2VKb3VybmV5ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igd2l0aCBqb3VybmV5JywgcmVwb25zZS5kYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG4gIC5kaXJlY3RpdmUoJ215Q3VzdG9tZXInLCBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRlbXBsYXRlOiAnTmFtZSB7eyAgam91cm5leXBsYW5uZXIuY3VzdG9tZXIubmFtZSB9fSdcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcblx0LmZhY3RvcnkoJ2pvdXJuZXlQbGFubmVyRmFjdCcsIGpvdXJuZXlQbGFubmVyRmFjdCk7XHJcblxyXG5cdGpvdXJuZXlQbGFubmVyRmFjdC4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGpvdXJuZXlQbGFubmVyRmFjdCgkaHR0cCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb21pc2VKb3VybmV5RmVlZDogZnVuY3Rpb24oZGVzdGluYXRpb25zKSB7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGRlc3RpbmF0aW9ucy5mcm9tLmljc0lkICsgJy90by8nICsgZGVzdGluYXRpb25zLnRvLmljc0lkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICBcdH1cclxuXHJcbn0pKCk7XHJcblxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
