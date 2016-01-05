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
		pages.pages().then(function (response) {
			self.pages = response.data;
		}, function (data) {
			console.log(data);
		});
		this.message = "all is good";
	}
})();
'use strict';

(function () {
  'use strict';

  angular.module('myApp.about').factory('pages', pages);
  pages.$inject = ['$http', 'myConfig'];

  function pages($http, myConfig) {

    return {

      pages: function pages() {
        return $http.get(myConfig.wordpressPages);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0L2Fib3V0LmNvbmZpZy5qcyIsImFib3V0L2Fib3V0LmNvbnRyb2xsZXIuanMiLCJhYm91dC9hYm91dC5mYWN0b3J5LmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29uZmlnLmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29udHJvbGxlci5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmRpcmVjdGl2ZS5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmZhY3RvcnkuanMiLCJwb3N0cy9wb3N0cy5jb25maWcuanMiLCJwb3N0cy9wb3N0cy5jb250cm9sbGVyLmpzIiwicG9zdHMvcG9zdHMuZmFjdG9yeS5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5jb25maWcuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29udHJvbGxlci5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5zZXJ2aWNlLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb25maWcuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmNvbnRyb2xsZXIuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudGV4dC5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuZmFjdG9yeS52aWV3MWZhY3QuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbmZpZy5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuY29udHJvbGxlci5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBVztBQUNYLGFBQVksRUFFWixPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUU1QixNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLGNBQWMs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LGtCQUFnQixDQUFDLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRS9DLFdBQVMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFOztBQUV6QyxRQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7QUFDL0IsUUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDOztBQUVyQyxtQkFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLFFBQVEsRUFBRTtBQUM1QyxVQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDMUIsRUFDQyxVQUFTLElBQUksRUFBRTtBQUNmLGFBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkIsQ0FBQyxDQUFBO0dBRUg7Q0FFSixDQUFBLEVBQUcsQ0FBQzs7O0FDeEJMLENBQUMsWUFBVztBQUNaLGNBQVksQ0FBQzs7QUFFYixTQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBRWpDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFN0MsaUJBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEMsV0FBUyxlQUFlLENBQUMsS0FBSyxFQUFFOztBQUU5QixXQUFPO0FBQ0wsYUFBTyxFQUFFLG1CQUFtQjs7QUFFNUIsU0FBRyxFQUFHLGVBQVc7QUFDZixlQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUU7QUFDL0QsZ0JBQU0sRUFBRTtBQUNOLGtCQUFNLEVBQUUsVUFBVTtBQUNsQixtQkFBTyxFQUFFLGtDQUFrQztXQUM1QztTQUNGLENBQUMsQ0FBQztPQUNKO0tBQ0YsQ0FBQTtHQUNGO0NBRUYsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCcsXG5cblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcblxuXHQuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xuXHRcdCRyb3V0ZVByb3ZpZGVyXG5cdFx0XHQud2hlbignL2Fib3V0Jywge1xuXHRcdFx0XHRjb250cm9sbGVyOiAnYWJvdXRDdHJsJyxcblx0XHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvYWJvdXQvYWJvdXQuaHRtbCdcblx0XHRcdH0pXG5cdH1dKTtcblxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcblx0J3VzZSBzdHJpY3QnLFxuXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5hYm91dCcpXG5cblx0LmNvbnRyb2xsZXIoJ2Fib3V0Q3RybCcsIGFib3V0Q3RybClcblxuXHRhYm91dEN0cmwuJGluamVjdCA9IFsncGFnZXMnXTtcblxuXHRmdW5jdGlvbiBhYm91dEN0cmwocGFnZXMpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0cGFnZXMucGFnZXMoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG5cdFx0XHRzZWxmLnBhZ2VzID0gcmVzcG9uc2UuZGF0YTtcblx0XHR9LCBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHR9KVxuXHRcdHRoaXMubWVzc2FnZSA9IFwiYWxsIGlzIGdvb2RcIjtcblx0fVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5hYm91dCcpXG5cbiAgLmZhY3RvcnkoJ3BhZ2VzJywgcGFnZXMpO1xuICBwYWdlcy4kaW5qZWN0ID0gWyckaHR0cCcsICdteUNvbmZpZyddO1xuXG4gIGZ1bmN0aW9uIHBhZ2VzKCRodHRwLCBteUNvbmZpZykge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgcGFnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnLFxuXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXG5cblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcblx0ICAkcm91dGVQcm92aWRlclxuXHQgICAgLndoZW4oJy9qb3VybmV5cGxhbm5lcicsIHtcblx0ICAgICAgY29udHJvbGxlcjogJ2pvdXJuZXlQbGFubmVyJyxcblx0ICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2pvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmh0bWwnLFxuXHQgICAgICBjb250cm9sbGVyQXM6ICd2bSdcblx0ICAgIH0pXG5cdH1dKTtcblxufSkoKTtcblxuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCcsXG5cbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcblxuICAuY29udHJvbGxlcignam91cm5leVBsYW5uZXInLCBqb3VybmV5UGxhbm5lcik7XG5cbiAgam91cm5leVBsYW5uZXIuJGluamVjdCA9IFsnam91cm5leVBsYW5uZXJGYWN0JywgJyRzY29wZScsICckbG9nJywgJyRodHRwJ107XG5cbiAgZnVuY3Rpb24gam91cm5leVBsYW5uZXIoam91cm5leVBsYW5uZXJGYWN0LCAkc2NvcGUsICRsb2csICRodHRwKSB7XG4gICBcbiAgICAkc2NvcGUucGVyc29uID0gJ01pa2V5cyc7XG4gICAgJHNjb3BlLmdldExvY2F0aW9uID0gZ2V0TG9jYXRpb247XG4gICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZGVzdGluYXRpb25zO1xuICAgIHRoaXMucHJvbWlzZUpvdXJuZXkgPSAnJztcblxuICAgIC8qIGRpcmVjdGl2ZSBjdXN0b21lciBuYW1lICovXG4gICAgdGhpcy5jdXN0b21lciA9IHtcbiAgICAgIG5hbWU6ICdFcmljIENhbnRvbmEnXG4gICAgfVxuXG4gICAgLyogdGFicyAqL1xuICAgICRzY29wZS50YWJzID0gW1xuICAgICAgeyB0aXRsZTonRHluYW1pYyBUaXRsZSAxJywgY29udGVudDonRHluYW1pYyBjb250ZW50IDEnIH0sXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cbiAgICBdO1xuICAgICAgICAgXG4gICAgLyogdHlwZWFoZWFkICovXG4gICAgLyogcmV0dXJucyBsb2NhdGlvbiBmcm9tIHF1ZXJ5IGlucHV0ICovXG5cbiAgICBmdW5jdGlvbiBnZXRMb2NhdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvU3RvcFBvaW50L3NlYXJjaCcsIHtcbiAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgcXVlcnk6IHZhbCxcbiAgICAgICAgICBtb2RlczogJ3R1YmUnXG4gICAgICAgIH1cbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXRjaGVzLm1hcChmdW5jdGlvbihpdGVtKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygndGhlcmUgYXN5bmMnLCBpdGVtKTtcbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgIH07XG5cbiAgIC8vdHlwZWFoZWFkIGVuZFxuXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgY29uc29sZS5sb2coJ2Rlc3RpbmF0aW9ucycsIHRoaXMuZGVzdGluYXRpb25zKTtcbiAgICAgIGpvdXJuZXlQbGFubmVyRmFjdC5wcm9taXNlSm91cm5leUZlZWQodGhpcy5kZXN0aW5hdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgc2VsZi5wcm9taXNlSm91cm5leSA9IHJlc3BvbnNlLmRhdGE7XG4gICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igd2l0aCBqb3VybmV5JywgcmVwb25zZS5kYXRhKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JyxcblxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxuXG4gIC5kaXJlY3RpdmUoJ215Q3VzdG9tZXInLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGVtcGxhdGU6ICdOYW1lIHt7ICBqb3VybmV5cGxhbm5lci5jdXN0b21lci5uYW1lIH19J1xuICAgIH07XG4gIH0pO1xuXG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG5cdCd1c2Ugc3RyaWN0JyxcblxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxuXG5cdC5mYWN0b3J5KCdqb3VybmV5UGxhbm5lckZhY3QnLCBqb3VybmV5UGxhbm5lckZhY3QpO1xuXG5cdGpvdXJuZXlQbGFubmVyRmFjdC4kaW5qZWN0ID0gWyckaHR0cCddO1xuXHRcblx0ZnVuY3Rpb24gam91cm5leVBsYW5uZXJGYWN0KCRodHRwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlSm91cm5leUZlZWQ6IGZ1bmN0aW9uKGRlc3RpbmF0aW9ucykge1xuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZGVzdGluYXRpb25zLmZyb20uaWNzSWQgKyAnL3RvLycgKyBkZXN0aW5hdGlvbnMudG8uaWNzSWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gIFx0fVxuXG59KSgpO1xuXG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxuXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL3Bvc3RzJywge1xuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3Bvc3RzL3Bvc3RzLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ3Bvc3RzQ3RybCcsXG4gICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9KTtcbiAgfV0pXG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCcsXG5cblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcblx0LmNvbnRyb2xsZXIoJ3Bvc3RzQ3RybCcsIHBvc3RzQ3RybCk7XG5cbiAgcG9zdHNDdHJsLiRpbmplY3QgPSBbJ3Bvc3RzJ107XG4gIFxuICBmdW5jdGlvbiBwb3N0c0N0cmwocG9zdHMpe1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBwb3N0cy5wb3N0cygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHNlbGYucG9zdHMgPSByZXNwb25zZS5kYXRhO1xuICAgIH0sIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0pO1xuICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5wb3N0cycpXG5cbiAgLmZhY3RvcnkoJ3Bvc3RzJywgcG9zdHMpO1xuICBwb3N0cy4kaW5qZWN0ID0gWyckaHR0cCcsICdteUNvbmZpZyddO1xuXG4gIGZ1bmN0aW9uIHBvc3RzKCRodHRwLCBteUNvbmZpZykge1xuXG4gICAgcmV0dXJuIHtcblxuICAgICAgcG9zdHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1Bvc3RzKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXG5cblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcblx0ICAkcm91dGVQcm92aWRlci53aGVuKCcvc3RhcndhcnMnLCB7XG5cdCAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvc3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmh0bWwnLFxuXHQgICAgY29udHJvbGxlcjogJ3N0YXJ3YXJzJyxcblx0ICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xuXHQgIH0pO1xuXHR9XSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXG5cblx0LmNvbnRyb2xsZXIoJ3N0YXJ3YXJzJywgc3RhcndhcnMpO1xuXG5cdHN0YXJ3YXJzLiRpbmplY3QgPSBbJ2J5bGluZUFuaW0nLCAnJHNjb3BlJywgJyRsb2NhdGlvbiddO1xuXG5cdGZ1bmN0aW9uIHN0YXJ3YXJzKGJ5bGluZSwgJHNjb3BlLCAkbG9jYXRpb24pIHtcblx0XHQkc2NvcGUuYnlsaW5lO1xuXHRcdCRzY29wZS5hbmltYXRpb25FbmQgPSBhbmltYXRpb25FbmQ7XG5cdFx0ZnVuY3Rpb24gYW5pbWF0aW9uRW5kKCl7XG5cdFx0XHRmdW5jdGlvbiBteVNjcmlwdCgpIHsgXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhbmltIGlzIHdvcmtpbmcgd2Fob29vIScsICRsb2NhdGlvbi5wYXRoKCkpO1xuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL3Rlcm1pbmFsdGV4dCcpO1xuXHRcdFx0XHQkc2NvcGUuJGFwcGx5KCk7XG5cdFx0XHR9XG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFydGluJykuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBteVNjcmlwdCk7XG5cdFx0fVxuXG5cdH1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5zdGFyd2Fyc1RleHQnKVxuXHRcblx0LnNlcnZpY2UoJ2J5bGluZUFuaW0nLCBieWxpbmVBbmltKTtcblxuXHRmdW5jdGlvbiBieWxpbmVBbmltKCl7IFxuXG5cdFx0Lypcblx0XHRcdFRoZSBmb2xsb3dpbmcgSlMgdGFrZXMgaW4gdGhlIGJ5bGluZSBhbmQgc3BsaXRzIGl0IGludG8gbGV0dGVycywgZWFjaCBvbmUgd3JhcHBlZCBpbiBhIHNwYW4uIFdlIG5lZWQgdG8gY3JlYXRlIHRoZSBzcGFucyBhcyBub2Rlcywgd2UgY2FuJ3QganVzdCBhZGQgdGhlbSB0byB0aGUgSFRNTCB1c2luZyBpbm5lckhUTUwsIGFzIHRvIGRvIHNvIHdvdWxkIG1lYW4gdGhlIENTUyB3b24ndCBhZmZlY3QgdGhlIHNwYW4gYmVjYXVzZSBpdCBkb2Vzbid0IHJlY29nbmlzZSB0aGUgdGFnIGFzIGV4aXN0aW5nLiBJdCdzIGFuIG9sZCBwcm9ibGVtIHdlIHJ1biBpbnRvIHRpbWUgYW5kIGFnYWluLlxuXHRcdCovXG5cblx0XHRcdHZhciBieWxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlsaW5lJyk7ICBcdC8vIEZpbmQgdGhlIEgyXG5cdFx0XHR2YXIgYnlsaW5lVGV4dCA9IGJ5bGluZS5pbm5lckhUTUw7XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBHZXQgdGhlIGNvbnRlbnQgb2YgdGhlIEgyXG5cdFx0XHR2YXIgYnlsaW5lQXJyID0gYnlsaW5lVGV4dC5zcGxpdCgnJyk7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BsaXQgY29udGVudCBpbnRvIGFycmF5XG5cdFx0XHRieWxpbmUuaW5uZXJIVE1MID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEVtcHR5IGN1cnJlbnQgY29udGVudFxuXG5cdFx0XHR2YXIgc3BhbjtcdFx0XHRcdFx0Ly8gQ3JlYXRlIHZhcmlhYmxlcyB0byBjcmVhdGUgZWxlbWVudHNcblx0XHRcdHZhciBsZXR0ZXI7XG5cblx0XHRcdGZvcih2YXIgaT0wO2k8YnlsaW5lQXJyLmxlbmd0aDtpKyspe1x0XHRcdFx0XHRcdFx0XHRcdC8vIExvb3AgZm9yIGV2ZXJ5IGxldHRlclxuXHRcdFx0ICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHRcdFx0XHRcdC8vIENyZWF0ZSBhIDxzcGFuPiBlbGVtZW50XG5cdFx0XHQgIGxldHRlciA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGJ5bGluZUFycltpXSk7XHQvLyBDcmVhdGUgdGhlIGxldHRlclxuXHRcdFx0ICBpZihieWxpbmVBcnJbaV0gPT0gJyAnKSB7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGxldHRlciBpcyBhIHNwYWNlLi4uXG5cdFx0XHQgICAgYnlsaW5lLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdC8vIC4uLkFkZCB0aGUgc3BhY2Ugd2l0aG91dCBhIHNwYW5cblx0XHRcdCAgfSBlbHNlIHtcblx0XHRcdFx0XHRzcGFuLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdFx0Ly8gQWRkIHRoZSBsZXR0ZXIgdG8gdGhlIHNwYW5cblx0XHRcdCAgXHRieWxpbmUuYXBwZW5kQ2hpbGQoc3Bhbik7IFx0XHRcdFx0XHQvLyBBZGQgdGhlIHNwYW4gdG8gdGhlIGgyXG5cdFx0XHQgIH1cblx0XHRcdH1cblxuXHR9XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXG5cbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvdGVybWluYWx0ZXh0Jywge1xuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3Rlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnVGVybWluYWxUZXh0Q3RybCcsXG4gICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICB9KTtcbiAgfV0pO1xuICBcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXG5cbiAgLmNvbnRyb2xsZXIoJ1Rlcm1pbmFsVGV4dEN0cmwnLCBUZXJtaW5hbFRleHRDdHJsKTtcblxuICBUZXJtaW5hbFRleHRDdHJsLiRpbmplY3QgPSBbJ3ZpZXcxRmFjdCcsICd0ZXJtaW5hbFRleHQnLCAnJHNjb3BlJywgJyR0aW1lb3V0JywgJyRsb2NhdGlvbiddO1xuXG4gIGZ1bmN0aW9uIFRlcm1pbmFsVGV4dEN0cmwodmlldzFGYWN0LCB0ZXJtaW5hbFRleHQsICRzY29wZSwgJHRpbWVvdXQsICRsb2NhdGlvbikge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGxldCBqaW1ibyA9ICdzb21ldGhpbmcnO1xuICAgICAgdGhpcy50ZXJtaW5hbFRleHQgPSB0ZXJtaW5hbFRleHQudGVybWluYWwoJy50ZXJtaW5hbCcpO1xuICAgICAgdmlldzFGYWN0LnBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBzZWxmLmhvbWVwYWdlID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xuICAgICAgICBjb25zb2xlLmxvZygndmlldzFGYWN0IGNvbnRyb2xsZXIgbm90IHdvcmtpbmcgJywgcmVhc29uKTtcbiAgICAgIH0pO1xuICAgICAgJHNjb3BlLiRvbigndGVybWluYWxUZXh0RmluaXNoJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdicm9hZGNhc3QgaGFzIHdvcmtlZCcpO1xuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJHNjb3BlLnNldEhvbWVCdG4gPSB0cnVlO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wZWVrQnRuQ2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3BlZWthYm9vJyk7XG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYWJvdXQnKTtcbiAgICAgIH1cblxuICB9XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXG4gIFxuICAuZmFjdG9yeSgndGVybWluYWxUZXh0JywgdGVybWluYWx0ZXh0KTtcbiAgdGVybWluYWx0ZXh0LiRpbmplY3QgPSBbJyRxJywgJyRpbnRlcnZhbCcsICckdGltZW91dCcsICckcm9vdFNjb3BlJ107XG5cbiAgZnVuY3Rpb24gdGVybWluYWx0ZXh0KCRxLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkcm9vdFNjb3BlKSB7XG4gICBcbiAgICB2YXIgZGVsYXkgPSAyMDAwO1xuICAgIHZhciBpdGVyYXRvcjtcbiAgICB2YXIgYmxpbmtMZXR0ZXJzO1xuICAgIHZhciBibGlua0xldHRlcnNDbGFzcztcbiAgICB2YXIgdGVybWluYWxUZXh0MTtcbiAgICB2YXIgYW5pbWF0aW9uVGV4dDtcblxuICAgICAgLyoqXG4gICAgICAgKiBBbmltYXRlcyB0aGUgYmxpbmsgdGV4dFxuICAgICAgICogQHBhcmFtIGNsYXNzIGNvbnRhaW5pbmcgdGhlIHRleHQgdG8gYW5pbWF0ZS5cbiAgICAgICAqICRzY29wZS4kZW1pdHMgdGVybWluYWxUZXh0RmluaXNoIGFmdGVyIGZ1bmN0aW9uIGZpbmlzaGVzLlxuICAgICAgICovXG4gICAgZnVuY3Rpb24gc2V0Qmxpbmt5KHRleHQpIHsgXG5cbiAgICAgIGJsaW5rTGV0dGVyc0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0ZXh0KTtcbiAgICAgIGJsaW5rTGV0dGVycyA9IGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTDtcbiAgICAgIGFuaW1hdGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uVGV4dCcpO1xuICAgICAgYmxpbmtMZXR0ZXJzQ2xhc3MuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidGVybWluYWxUZXh0MVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImJsaW5rXCI+JiN4N2M7PC9zcGFuPic7XG5cbiAgICAgIHZhciBibGlua1BpcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxpbmsnKTtcblxuICAgICAgdmFyIGJsaW5rID0gJGludGVydmFsKCBmdW5jdGlvbigpIHsgaWYgKGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID09IDAgfHwgYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPT0gJycgKSB7IGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMSB9IGVsc2Uge2JsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMCB9fSwgNjAwKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBBbmltYXRlcyB0aHJvdWdoIHRoZSBzdHJpbmcuIFNldHMgdGhlIHNldFRpbWVvdXQgZnVuY3Rpb24uXG4gICAgICAgKi9cblxuICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVCbGluaygpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gYmxpbmtMZXR0ZXJzLmxlbmd0aCsxOyBpKyspIHtcbiAgICAgICAgICBpZiggaSA9PSBibGlua0xldHRlcnMubGVuZ3RoICsgMSApIHtcbiAgICAgICAgICAgIGRlbGF5ID0gZGVsYXkgKyAxMDAwO1xuICAgICAgICAgICAgc2V0Q2FsbEJhY2tUaW1lT3V0KGRlbGF5KTsgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxheSA9IGRlbGF5ICsgNTAwO1xuICAgICAgICAgIHNldFRoZVRpbWVvdXQoaSxkZWxheSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIFNldHMgY2FsbGJhY2sgdG8gYW5pbWF0ZUJsaW5rIGZ1bmN0aW9uXG4gICAgICAgKi9cbiAgICAgICBmdW5jdGlvbiBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpIHtcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGVybWluYWxUZXh0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXJtaW5hbFRleHQxJyk7XG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS50b3AgPSAnNTAlJztcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLmxlZnQgPSAnNTAlJztcbiAgICAgICAgICB0ZXJtaW5hbFRleHQxLmNsYXNzTmFtZSArPSAnIGNlbnRlclRleHRBZnRlckFuaW0nO1xuICAgICAgICAgIGJsaW5rUGlwZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJsaW5rUGlwZSk7XG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd0ZXJtaW5hbFRleHRGaW5pc2gnKTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBJdGVyYXRvcnMgdGhlIHNldFRpbWVvdXQgZm9yIGFuaW1hdGlvbi5cbiAgICAgICAqL1xuICAgICAgIGZ1bmN0aW9uIHNldFRoZVRpbWVvdXQoaXRlcmF0b3IsIGRlbGF5KSB7XG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlcm1pbmFsVGV4dDEnKS5pbm5lckhUTUwgPSBibGlua0xldHRlcnMuc3Vic3RyKDAsIGl0ZXJhdG9yKTtcbiAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgfVxuXG4gICAgICAgYW5pbWF0ZUJsaW5rKCk7XG5cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGVybWluYWw6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgc2V0Qmxpbmt5KHRleHQpXG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcblxuICAuZmFjdG9yeSgndmlldzFGYWN0JywgdmlldzFGYWN0KTtcblxuICB2aWV3MUZhY3QuJGluamVjdCA9IFsnJGh0dHAnLCAnbXlDb25maWcnXTtcblxuICBmdW5jdGlvbiB2aWV3MUZhY3QoJGh0dHAsIG15Q29uZmlnKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmV3TWVzc2FnZTogJ25vb29vJyxcblxuICAgICAgcGFnZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXG5cbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgIC53aGVuKCcvdHViZXN0YXR1c2VzJywge1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICd0dWJlc3RhdHVzZXNDdHJsJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcbiAgICAgICAgfSlcbiAgfV0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcblxuICAuY29udHJvbGxlcigndHViZXN0YXR1c2VzQ3RybCcsIHR1YmVzdGF0dXNlc0N0cmwpO1xuXG4gIHR1YmVzdGF0dXNlc0N0cmwuJGluamVjdCA9IFsndHViZXN0YXR1c2VzVGZsJ107XG5cbiAgZnVuY3Rpb24gdHViZXN0YXR1c2VzQ3RybCh0dWJlc3RhdHVzZXNUZmwpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLm1lc3NhZ2UgPSAnaGVsbG9vIG1vbmtleSc7XG4gICAgdGhpcy52aWV3TXNnID0gdHViZXN0YXR1c2VzVGZsLm1lc3NhZ2U7XG5cbiAgICAgIHR1YmVzdGF0dXNlc1RmbC50ZmwoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHNlbGYudGZsID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9KVxuXG4gICAgfVxuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcblxuICAuZmFjdG9yeSgndHViZXN0YXR1c2VzVGZsJywgdHViZXN0YXR1c2VzVGZsKTtcblxuICB0dWJlc3RhdHVzZXNUZmwuJGluamVjdCA9IFsnJGh0dHAnXTtcblxuICBmdW5jdGlvbiB0dWJlc3RhdHVzZXNUZmwoJGh0dHApIHtcblxuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiAnc29tZWJvZHkgc3RvcCBtZSEnLFxuXG4gICAgICB0ZmwgOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9saW5lL21vZGUvdHViZS9zdGF0dXMnLCB7XG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBhcGlfaWQ6ICcxYTNmZmJkMicsXG4gICAgICAgICAgICBhcGlfa2V5OiAnMmFkZmIwMjAwMWFkZmVmYTA2OGY3YTc0ODYyODU0ZTYnXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
