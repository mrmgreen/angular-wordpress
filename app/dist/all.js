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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0L2Fib3V0LmNvbmZpZy5qcyIsImFib3V0L2Fib3V0LmNvbnRyb2xsZXIuanMiLCJhYm91dC9hYm91dC5mYWN0b3J5LmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29uZmlnLmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29udHJvbGxlci5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmRpcmVjdGl2ZS5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmZhY3RvcnkuanMiLCJwb3N0cy9wb3N0cy5jb25maWcuanMiLCJwb3N0cy9wb3N0cy5jb250cm9sbGVyLmpzIiwicG9zdHMvcG9zdHMuZmFjdG9yeS5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5jb25maWcuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29udHJvbGxlci5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5zZXJ2aWNlLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb25maWcuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmNvbnRyb2xsZXIuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudGV4dC5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuZmFjdG9yeS52aWV3MWZhY3QuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbmZpZy5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuY29udHJvbGxlci5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBVztBQUNYLGFBQVksRUFFWixPQUFPLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUU1QixNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFTLGNBQWMs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QUFnQixDQUFDLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRS9DLFdBQVMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFOztBQUV6QyxRQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsUUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7QUFDL0IsUUFBSSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUMsT0FBTyxDQUFDOztBQUVyQyxtQkFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLFFBQVEsRUFBRTtBQUM1QyxVQUFJLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7S0FDMUIsRUFDQyxVQUFTLElBQUksRUFBRTtBQUNmLGFBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkIsQ0FBQyxDQUFBO0dBRUg7Q0FFSixDQUFBLEVBQUcsQ0FBQzs7O0FDeEJMLENBQUMsWUFBVztBQUNaLGNBQVksQ0FBQzs7QUFFYixTQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBRWpDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFN0MsaUJBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEMsV0FBUyxlQUFlLENBQUMsS0FBSyxFQUFFOztBQUU5QixXQUFPO0FBQ0wsYUFBTyxFQUFFLG1CQUFtQjs7QUFFNUIsU0FBRyxFQUFHLGVBQVc7QUFDZixlQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUU7QUFDL0QsZ0JBQU0sRUFBRTtBQUNOLGtCQUFNLEVBQUUsVUFBVTtBQUNsQixtQkFBTyxFQUFFLGtDQUFrQztXQUM1QztTQUNGLENBQUMsQ0FBQztPQUNKO0tBQ0YsQ0FBQTtHQUNGO0NBRUYsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcclxuXHJcblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdCRyb3V0ZVByb3ZpZGVyXHJcblx0XHRcdC53aGVuKCcvYWJvdXQnLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCcsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9hYm91dC9hYm91dC5odG1sJ1xyXG5cdFx0XHR9KVxyXG5cdH1dKTtcclxuXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5hYm91dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdhYm91dEN0cmwnLCBhYm91dEN0cmwpXHJcblxyXG5cdGFib3V0Q3RybC4kaW5qZWN0ID0gWydwYWdlcyddO1xyXG5cclxuXHRmdW5jdGlvbiBhYm91dEN0cmwocGFnZXMpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHBhZ2VzLnBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRzZWxmLnBhZ2VzID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHR9KVxyXG5cdFx0dGhpcy5tZXNzYWdlID0gXCJhbGwgaXMgZ29vZFwiO1xyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcclxuXHJcbiAgLmZhY3RvcnkoJ3BhZ2VzJywgcGFnZXMpO1xyXG4gIHBhZ2VzLiRpbmplY3QgPSBbJyRodHRwJywgJ215Q29uZmlnJ107XHJcblxyXG4gIGZ1bmN0aW9uIHBhZ2VzKCRodHRwLCBteUNvbmZpZykge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICBwYWdlczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQYWdlcyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuXHQuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG5cdCAgJHJvdXRlUHJvdmlkZXJcclxuXHQgICAgLndoZW4oJy9qb3VybmV5cGxhbm5lcicsIHtcclxuXHQgICAgICBjb250cm9sbGVyOiAnam91cm5leVBsYW5uZXInLFxyXG5cdCAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9qb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5odG1sJyxcclxuXHQgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuXHQgICAgfSlcclxuXHR9XSk7XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ2pvdXJuZXlQbGFubmVyJywgam91cm5leVBsYW5uZXIpO1xyXG5cclxuICBqb3VybmV5UGxhbm5lci4kaW5qZWN0ID0gWydqb3VybmV5UGxhbm5lckZhY3QnLCAnJHNjb3BlJywgJyRsb2cnLCAnJGh0dHAnXTtcclxuXHJcbiAgZnVuY3Rpb24gam91cm5leVBsYW5uZXIoam91cm5leVBsYW5uZXJGYWN0LCAkc2NvcGUsICRsb2csICRodHRwKSB7XHJcbiAgIFxyXG4gICAgJHNjb3BlLnBlcnNvbiA9ICdNaWtleXMnO1xyXG4gICAgJHNjb3BlLmdldExvY2F0aW9uID0gZ2V0TG9jYXRpb247XHJcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuZGVzdGluYXRpb25zO1xyXG4gICAgdGhpcy5wcm9taXNlSm91cm5leSA9ICcnO1xyXG5cclxuICAgIC8qIGRpcmVjdGl2ZSBjdXN0b21lciBuYW1lICovXHJcbiAgICB0aGlzLmN1c3RvbWVyID0ge1xyXG4gICAgICBuYW1lOiAnRXJpYyBDYW50b25hJ1xyXG4gICAgfVxyXG5cclxuICAgIC8qIHRhYnMgKi9cclxuICAgICRzY29wZS50YWJzID0gW1xyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDEnLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMScgfSxcclxuICAgICAgeyB0aXRsZTonRHluYW1pYyBUaXRsZSAyJywgY29udGVudDonRHluYW1pYyBjb250ZW50IDInLCBkaXNhYmxlZDogdHJ1ZSB9XHJcbiAgICBdO1xyXG4gICAgICAgICBcclxuICAgIC8qIHR5cGVhaGVhZCAqL1xyXG4gICAgLyogcmV0dXJucyBsb2NhdGlvbiBmcm9tIHF1ZXJ5IGlucHV0ICovXHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0TG9jYXRpb24odmFsKSB7XHJcbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvU3RvcFBvaW50L3NlYXJjaCcsIHtcclxuICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgIHF1ZXJ5OiB2YWwsXHJcbiAgICAgICAgICBtb2RlczogJ3R1YmUnXHJcbiAgICAgICAgfVxyXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcclxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXRjaGVzLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSBhc3luYycsIGl0ZW0pO1xyXG4gICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICB9O1xyXG5cclxuICAgLy90eXBlYWhlYWQgZW5kXHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnZGVzdGluYXRpb25zJywgdGhpcy5kZXN0aW5hdGlvbnMpO1xyXG4gICAgICBqb3VybmV5UGxhbm5lckZhY3QucHJvbWlzZUpvdXJuZXlGZWVkKHRoaXMuZGVzdGluYXRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgc2VsZi5wcm9taXNlSm91cm5leSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHdpdGggam91cm5leScsIHJlcG9uc2UuZGF0YSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuICAuZGlyZWN0aXZlKCdteUN1c3RvbWVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0ZW1wbGF0ZTogJ05hbWUge3sgIGpvdXJuZXlwbGFubmVyLmN1c3RvbWVyLm5hbWUgfX0nXHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG5cdC5mYWN0b3J5KCdqb3VybmV5UGxhbm5lckZhY3QnLCBqb3VybmV5UGxhbm5lckZhY3QpO1xyXG5cclxuXHRqb3VybmV5UGxhbm5lckZhY3QuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHRcclxuXHRmdW5jdGlvbiBqb3VybmV5UGxhbm5lckZhY3QoJGh0dHApIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwcm9taXNlSm91cm5leUZlZWQ6IGZ1bmN0aW9uKGRlc3RpbmF0aW9ucykge1xyXG4gICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9qb3VybmV5L2pvdXJuZXlyZXN1bHRzLycgKyBkZXN0aW5hdGlvbnMuZnJvbS5pY3NJZCArICcvdG8vJyArIGRlc3RpbmF0aW9ucy50by5pY3NJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHR9XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy9wb3N0cycsIHtcclxuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3Bvc3RzL3Bvc3RzLmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyOiAncG9zdHNDdHJsJyxcclxuICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICB9KTtcclxuICB9XSlcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHQuY29udHJvbGxlcigncG9zdHNDdHJsJywgcG9zdHNDdHJsKTtcclxuXHJcbiAgcG9zdHNDdHJsLiRpbmplY3QgPSBbJ3Bvc3RzJ107XHJcbiAgXHJcbiAgZnVuY3Rpb24gcG9zdHNDdHJsKHBvc3RzKXtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHBvc3RzLnBvc3RzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBzZWxmLnBvc3RzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJylcclxuXHJcbiAgLmZhY3RvcnkoJ3Bvc3RzJywgcG9zdHMpO1xyXG4gIHBvc3RzLiRpbmplY3QgPSBbJyRodHRwJywgJ215Q29uZmlnJ107XHJcblxyXG4gIGZ1bmN0aW9uIHBvc3RzKCRodHRwLCBteUNvbmZpZykge1xyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICBwb3N0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQb3N0cyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5zdGFyd2Fyc1RleHQnKVxyXG5cclxuXHQuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG5cdCAgJHJvdXRlUHJvdmlkZXIud2hlbignL3N0YXJ3YXJzJywge1xyXG5cdCAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvc3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmh0bWwnLFxyXG5cdCAgICBjb250cm9sbGVyOiAnc3RhcndhcnMnLFxyXG5cdCAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuXHQgIH0pO1xyXG5cdH1dKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdzdGFyd2FycycsIHN0YXJ3YXJzKTtcclxuXHJcblx0c3RhcndhcnMuJGluamVjdCA9IFsnYnlsaW5lQW5pbScsICckc2NvcGUnLCAnJGxvY2F0aW9uJ107XHJcblxyXG5cdGZ1bmN0aW9uIHN0YXJ3YXJzKGJ5bGluZSwgJHNjb3BlLCAkbG9jYXRpb24pIHtcclxuXHRcdCRzY29wZS5ieWxpbmU7XHJcblx0XHQkc2NvcGUuYW5pbWF0aW9uRW5kID0gYW5pbWF0aW9uRW5kO1xyXG5cdFx0ZnVuY3Rpb24gYW5pbWF0aW9uRW5kKCl7XHJcblx0XHRcdGZ1bmN0aW9uIG15U2NyaXB0KCkgeyBcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnYW5pbSBpcyB3b3JraW5nIHdhaG9vbyEnLCAkbG9jYXRpb24ucGF0aCgpKTtcclxuXHRcdFx0XHQkbG9jYXRpb24ucGF0aCgnL3Rlcm1pbmFsdGV4dCcpO1xyXG5cdFx0XHRcdCRzY29wZS4kYXBwbHkoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFydGluJykuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBteVNjcmlwdCk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHRcclxuXHQuc2VydmljZSgnYnlsaW5lQW5pbScsIGJ5bGluZUFuaW0pO1xyXG5cclxuXHRmdW5jdGlvbiBieWxpbmVBbmltKCl7IFxyXG5cclxuXHRcdC8qXHJcblx0XHRcdFRoZSBmb2xsb3dpbmcgSlMgdGFrZXMgaW4gdGhlIGJ5bGluZSBhbmQgc3BsaXRzIGl0IGludG8gbGV0dGVycywgZWFjaCBvbmUgd3JhcHBlZCBpbiBhIHNwYW4uIFdlIG5lZWQgdG8gY3JlYXRlIHRoZSBzcGFucyBhcyBub2Rlcywgd2UgY2FuJ3QganVzdCBhZGQgdGhlbSB0byB0aGUgSFRNTCB1c2luZyBpbm5lckhUTUwsIGFzIHRvIGRvIHNvIHdvdWxkIG1lYW4gdGhlIENTUyB3b24ndCBhZmZlY3QgdGhlIHNwYW4gYmVjYXVzZSBpdCBkb2Vzbid0IHJlY29nbmlzZSB0aGUgdGFnIGFzIGV4aXN0aW5nLiBJdCdzIGFuIG9sZCBwcm9ibGVtIHdlIHJ1biBpbnRvIHRpbWUgYW5kIGFnYWluLlxyXG5cdFx0Ki9cclxuXHJcblx0XHRcdHZhciBieWxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlsaW5lJyk7ICBcdC8vIEZpbmQgdGhlIEgyXHJcblx0XHRcdHZhciBieWxpbmVUZXh0ID0gYnlsaW5lLmlubmVySFRNTDtcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEdldCB0aGUgY29udGVudCBvZiB0aGUgSDJcclxuXHRcdFx0dmFyIGJ5bGluZUFyciA9IGJ5bGluZVRleHQuc3BsaXQoJycpO1x0XHRcdFx0XHRcdFx0XHRcdC8vIFNwbGl0IGNvbnRlbnQgaW50byBhcnJheVxyXG5cdFx0XHRieWxpbmUuaW5uZXJIVE1MID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEVtcHR5IGN1cnJlbnQgY29udGVudFxyXG5cclxuXHRcdFx0dmFyIHNwYW47XHRcdFx0XHRcdC8vIENyZWF0ZSB2YXJpYWJsZXMgdG8gY3JlYXRlIGVsZW1lbnRzXHJcblx0XHRcdHZhciBsZXR0ZXI7XHJcblxyXG5cdFx0XHRmb3IodmFyIGk9MDtpPGJ5bGluZUFyci5sZW5ndGg7aSsrKXtcdFx0XHRcdFx0XHRcdFx0XHQvLyBMb29wIGZvciBldmVyeSBsZXR0ZXJcclxuXHRcdFx0ICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHRcdFx0XHRcdC8vIENyZWF0ZSBhIDxzcGFuPiBlbGVtZW50XHJcblx0XHRcdCAgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnlsaW5lQXJyW2ldKTtcdC8vIENyZWF0ZSB0aGUgbGV0dGVyXHJcblx0XHRcdCAgaWYoYnlsaW5lQXJyW2ldID09ICcgJykge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBsZXR0ZXIgaXMgYSBzcGFjZS4uLlxyXG5cdFx0XHQgICAgYnlsaW5lLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdC8vIC4uLkFkZCB0aGUgc3BhY2Ugd2l0aG91dCBhIHNwYW5cclxuXHRcdFx0ICB9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3Bhbi5hcHBlbmRDaGlsZChsZXR0ZXIpO1x0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGV0dGVyIHRvIHRoZSBzcGFuXHJcblx0XHRcdCAgXHRieWxpbmUuYXBwZW5kQ2hpbGQoc3Bhbik7IFx0XHRcdFx0XHQvLyBBZGQgdGhlIHNwYW4gdG8gdGhlIGgyXHJcblx0XHRcdCAgfVxyXG5cdFx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvdGVybWluYWx0ZXh0Jywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvdGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5odG1sJyxcclxuICAgICAgY29udHJvbGxlcjogJ1Rlcm1pbmFsVGV4dEN0cmwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH0pO1xyXG4gIH1dKTtcclxuICBcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ1Rlcm1pbmFsVGV4dEN0cmwnLCBUZXJtaW5hbFRleHRDdHJsKTtcclxuXHJcbiAgVGVybWluYWxUZXh0Q3RybC4kaW5qZWN0ID0gWyd2aWV3MUZhY3QnLCAndGVybWluYWxUZXh0JywgJyRzY29wZScsICckdGltZW91dCcsICckbG9jYXRpb24nXTtcclxuXHJcbiAgZnVuY3Rpb24gVGVybWluYWxUZXh0Q3RybCh2aWV3MUZhY3QsIHRlcm1pbmFsVGV4dCwgJHNjb3BlLCAkdGltZW91dCwgJGxvY2F0aW9uKSB7XHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGxldCBqaW1ibyA9ICdzb21ldGhpbmcnO1xyXG4gICAgICB0aGlzLnRlcm1pbmFsVGV4dCA9IHRlcm1pbmFsVGV4dC50ZXJtaW5hbCgnLnRlcm1pbmFsJyk7XHJcbiAgICAgIHZpZXcxRmFjdC5wYWdlcygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLmhvbWVwYWdlID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZpZXcxRmFjdCBjb250cm9sbGVyIG5vdCB3b3JraW5nICcsIHJlYXNvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkc2NvcGUuJG9uKCd0ZXJtaW5hbFRleHRGaW5pc2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYnJvYWRjYXN0IGhhcyB3b3JrZWQnKTtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkc2NvcGUuc2V0SG9tZUJ0biA9IHRydWU7XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnBlZWtCdG5DbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdwZWVrYWJvbycpO1xyXG4gICAgICAgICRsb2NhdGlvbi5wYXRoKCcvYWJvdXQnKTtcclxuICAgICAgfVxyXG5cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnKVxyXG4gIFxyXG4gIC5mYWN0b3J5KCd0ZXJtaW5hbFRleHQnLCB0ZXJtaW5hbHRleHQpO1xyXG4gIHRlcm1pbmFsdGV4dC4kaW5qZWN0ID0gWyckcScsICckaW50ZXJ2YWwnLCAnJHRpbWVvdXQnLCAnJHJvb3RTY29wZSddO1xyXG5cclxuICBmdW5jdGlvbiB0ZXJtaW5hbHRleHQoJHEsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRyb290U2NvcGUpIHtcclxuICAgXHJcbiAgICB2YXIgZGVsYXkgPSAyMDAwO1xyXG4gICAgdmFyIGl0ZXJhdG9yO1xyXG4gICAgdmFyIGJsaW5rTGV0dGVycztcclxuICAgIHZhciBibGlua0xldHRlcnNDbGFzcztcclxuICAgIHZhciB0ZXJtaW5hbFRleHQxO1xyXG4gICAgdmFyIGFuaW1hdGlvblRleHQ7XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogQW5pbWF0ZXMgdGhlIGJsaW5rIHRleHRcclxuICAgICAgICogQHBhcmFtIGNsYXNzIGNvbnRhaW5pbmcgdGhlIHRleHQgdG8gYW5pbWF0ZS5cclxuICAgICAgICogJHNjb3BlLiRlbWl0cyB0ZXJtaW5hbFRleHRGaW5pc2ggYWZ0ZXIgZnVuY3Rpb24gZmluaXNoZXMuXHJcbiAgICAgICAqL1xyXG4gICAgZnVuY3Rpb24gc2V0Qmxpbmt5KHRleHQpIHsgXHJcblxyXG4gICAgICBibGlua0xldHRlcnNDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGV4dCk7XHJcbiAgICAgIGJsaW5rTGV0dGVycyA9IGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTDtcclxuICAgICAgYW5pbWF0aW9uVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRpb25UZXh0Jyk7XHJcbiAgICAgIGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRlcm1pbmFsVGV4dDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJibGlua1wiPiYjeDdjOzwvc3Bhbj4nO1xyXG5cclxuICAgICAgdmFyIGJsaW5rUGlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibGluaycpO1xyXG5cclxuICAgICAgdmFyIGJsaW5rID0gJGludGVydmFsKCBmdW5jdGlvbigpIHsgaWYgKGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID09IDAgfHwgYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPT0gJycgKSB7IGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMSB9IGVsc2Uge2JsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID0gMCB9fSwgNjAwKTtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBBbmltYXRlcyB0aHJvdWdoIHRoZSBzdHJpbmcuIFNldHMgdGhlIHNldFRpbWVvdXQgZnVuY3Rpb24uXHJcbiAgICAgICAqL1xyXG5cclxuICAgICAgIGZ1bmN0aW9uIGFuaW1hdGVCbGluaygpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBibGlua0xldHRlcnMubGVuZ3RoKzE7IGkrKykge1xyXG4gICAgICAgICAgaWYoIGkgPT0gYmxpbmtMZXR0ZXJzLmxlbmd0aCArIDEgKSB7XHJcbiAgICAgICAgICAgIGRlbGF5ID0gZGVsYXkgKyAxMDAwO1xyXG4gICAgICAgICAgICBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpOyBcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBkZWxheSA9IGRlbGF5ICsgNTAwO1xyXG4gICAgICAgICAgc2V0VGhlVGltZW91dChpLGRlbGF5KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogU2V0cyBjYWxsYmFjayB0byBhbmltYXRlQmxpbmsgZnVuY3Rpb25cclxuICAgICAgICovXHJcbiAgICAgICBmdW5jdGlvbiBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpIHtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIHRlcm1pbmFsVGV4dDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVybWluYWxUZXh0MScpO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLnRvcCA9ICc1MCUnO1xyXG4gICAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5sZWZ0ID0gJzUwJSc7XHJcbiAgICAgICAgICB0ZXJtaW5hbFRleHQxLmNsYXNzTmFtZSArPSAnIGNlbnRlclRleHRBZnRlckFuaW0nO1xyXG4gICAgICAgICAgYmxpbmtQaXBlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmxpbmtQaXBlKTtcclxuICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndGVybWluYWxUZXh0RmluaXNoJyk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEl0ZXJhdG9ycyB0aGUgc2V0VGltZW91dCBmb3IgYW5pbWF0aW9uLlxyXG4gICAgICAgKi9cclxuICAgICAgIGZ1bmN0aW9uIHNldFRoZVRpbWVvdXQoaXRlcmF0b3IsIGRlbGF5KSB7XHJcbiAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXJtaW5hbFRleHQxJykuaW5uZXJIVE1MID0gYmxpbmtMZXR0ZXJzLnN1YnN0cigwLCBpdGVyYXRvcik7XHJcbiAgICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAgYW5pbWF0ZUJsaW5rKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRlcm1pbmFsOiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgICAgc2V0Qmxpbmt5KHRleHQpXHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmZhY3RvcnkoJ3ZpZXcxRmFjdCcsIHZpZXcxRmFjdCk7XHJcblxyXG4gIHZpZXcxRmFjdC4kaW5qZWN0ID0gWyckaHR0cCcsICdteUNvbmZpZyddO1xyXG5cclxuICBmdW5jdGlvbiB2aWV3MUZhY3QoJGh0dHAsIG15Q29uZmlnKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmV3TWVzc2FnZTogJ25vb29vJyxcclxuXHJcbiAgICAgIHBhZ2VzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLndoZW4oJy90dWJlc3RhdHVzZXMnLCB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvdHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5odG1sJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICd0dWJlc3RhdHVzZXNDdHJsJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgIH0pXHJcbiAgfV0pO1xyXG5cclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ3R1YmVzdGF0dXNlc0N0cmwnLCB0dWJlc3RhdHVzZXNDdHJsKTtcclxuXHJcbiAgdHViZXN0YXR1c2VzQ3RybC4kaW5qZWN0ID0gWyd0dWJlc3RhdHVzZXNUZmwnXTtcclxuXHJcbiAgZnVuY3Rpb24gdHViZXN0YXR1c2VzQ3RybCh0dWJlc3RhdHVzZXNUZmwpIHtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSAnaGVsbG9vIG1vbmtleSc7XHJcbiAgICB0aGlzLnZpZXdNc2cgPSB0dWJlc3RhdHVzZXNUZmwubWVzc2FnZTtcclxuXHJcbiAgICAgIHR1YmVzdGF0dXNlc1RmbC50ZmwoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgc2VsZi50ZmwgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC50dWJlc3RhdHVzZXMnKVxyXG5cclxuICAuZmFjdG9yeSgndHViZXN0YXR1c2VzVGZsJywgdHViZXN0YXR1c2VzVGZsKTtcclxuXHJcbiAgdHViZXN0YXR1c2VzVGZsLiRpbmplY3QgPSBbJyRodHRwJ107XHJcblxyXG4gIGZ1bmN0aW9uIHR1YmVzdGF0dXNlc1RmbCgkaHR0cCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzb21lYm9keSBzdG9wIG1lIScsXHJcblxyXG4gICAgICB0ZmwgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2xpbmUvbW9kZS90dWJlL3N0YXR1cycsIHtcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBhcGlfaWQ6ICcxYTNmZmJkMicsXHJcbiAgICAgICAgICAgIGFwaV9rZXk6ICcyYWRmYjAyMDAxYWRmZWZhMDY4ZjdhNzQ4NjI4NTRlNidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
