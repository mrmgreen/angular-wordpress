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

      $http.get(myConfig.wordpressPages).then(function (data) {
        deferred.resolve(data);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    return service;
  }
})();
'use strict';

(function () {
	'use strict', angular.module('myApp.map').config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/map', {
			controller: 'maps',
			templateUrl: 'components/google-maps/map.html',
			controllerAs: 'vm'
		});
	}]);
})();
'use strict';

(function () {
	'use strict', angular.module('myApp.map').controller('maps', maps);

	function maps() {

		console.log('boom');
		appendGoogleMapsAPI();

		function appendGoogleMapsAPI() {
			var googleApi = document.createElement('script');
			googleApi.src = 'http://maps.googleapis.com/maps/api/js';
			googleApi.addEventListener('load', initialize);
			document.querySelector('head').appendChild(googleApi);
		}

		function initialize() {
			console.log('initialize');
			var mapProp = {
				center: new google.maps.LatLng(51.508742, -0.120850),
				zoom: 5,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
		}

		// initMap();

		// function initMap() {
		//   // Create a map object and specify the DOM element for display.
		//   var map = new google.maps.Map(document.getElementById('map'), {
		//     center: {lat: -34.397, lng: 150.644},
		//     scrollwheel: false,
		//     zoom: 8
		//   });
		// }
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
    this.getGeoLocation = getGeoLocation;

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

    function getGeoLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
      }
    }

    function showPosition(position) {
      console.log('getGeoLocation success', position);
      console.log('getGeoLocation success lat', position.coords.latitude);
      console.log('getGeoLocation success long', position.coords.longitude);
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
      }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFib3V0L2Fib3V0LmNvbmZpZy5qcyIsImFib3V0L2Fib3V0LmNvbnRyb2xsZXIuanMiLCJhYm91dC9hYm91dC5mYWN0b3J5LmpzIiwiZ29vZ2xlLW1hcHMvbWFwLmNvbmZpZy5qcyIsImdvb2dsZS1tYXBzL21hcC5jb250cm9sbGVyLmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29uZmlnLmpzIiwiam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuY29udHJvbGxlci5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmRpcmVjdGl2ZS5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmZhY3RvcnkuanMiLCJwb3N0cy9wb3N0cy5jb25maWcuanMiLCJwb3N0cy9wb3N0cy5jb250cm9sbGVyLmpzIiwicG9zdHMvcG9zdHMuZmFjdG9yeS5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5jb25maWcuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29udHJvbGxlci5qcyIsInN0YXJ3YXJzLXRleHQtYW5pbS9zdGFyd2Fycy5zZXJ2aWNlLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb25maWcuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmNvbnRyb2xsZXIuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudGV4dC5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuZmFjdG9yeS52aWV3MWZhY3QuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbmZpZy5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuY29udHJvbGxlci5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBVztBQUNYLGFBQVksRUFFWixPQUFPLENBQUMsTUFB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YixTQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBRWpDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFN0MsaUJBQWUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEMsV0FBUyxlQUFlLENBQUMsS0FBSyxFQUFFOztBQUU5QixXQUFPO0FBQ0wsYUFBTyxFQUFFLG1CQUFtQjs7QUFFNUIsU0FBRyxFQUFHLGVBQVc7QUFDZixlQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUU7QUFDL0QsZ0JBQU0sRUFBRTtBQUNOLGtCQUFNLEVBQUUsVUFBVTtBQUNsQixtQkFBTyxFQUFFLGtDQUFrQztXQUM1QztTQUNGLENBQUMsQ0FBQztPQUNKO0tBQ0YsQ0FBQTtHQUNGO0NBRUYsQ0FBQSxFQUFHLENBQUMiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcclxuXHJcblx0LmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuXHRcdCRyb3V0ZVByb3ZpZGVyXHJcblx0XHRcdC53aGVuKCcvYWJvdXQnLCB7XHJcblx0XHRcdFx0Y29udHJvbGxlcjogJ2Fib3V0Q3RybCcsXHJcblx0XHRcdFx0Y29udHJvbGxlckFzOiAndm0nLFxyXG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9hYm91dC9hYm91dC5odG1sJ1xyXG5cdFx0XHR9KVxyXG5cdH1dKTtcclxuXHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHQndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5hYm91dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdhYm91dEN0cmwnLCBhYm91dEN0cmwpXHJcblxyXG5cdGFib3V0Q3RybC4kaW5qZWN0ID0gWydwYWdlcyddO1xyXG5cclxuXHRmdW5jdGlvbiBhYm91dEN0cmwocGFnZXMpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHBhZ2VzLmdldFBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRzZWxmLnBhZ2VzID0gcmVzcG9uc2UuZGF0YTtcclxuXHRcdH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuXHRcdFx0c2VsZi5lcnJvciA9ICdnZXRQYWdlcyBoYXMgdGhyb3duIGFuIGVycm9yJztcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5tZXNzYWdlID0gXCJhbGwgaXMgZ29vZFwiO1xyXG5cdH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLmFib3V0JylcclxuXHJcbiAgLmZhY3RvcnkoJ3BhZ2VzJywgcGFnZXMpO1xyXG4gIHBhZ2VzLiRpbmplY3QgPSBbJyRxJywgJyRodHRwJywgJ215Q29uZmlnJ107XHJcblxyXG4gIGZ1bmN0aW9uIHBhZ2VzKCRxLCAkaHR0cCwgbXlDb25maWcpIHtcclxuXHJcbiAgdmFyIHNlcnZpY2UgPSB7fTtcclxuXHJcbiAgc2VydmljZS5nZXRQYWdlcyA9IGZ1bmN0aW9uIGdldFBhZ2VzKCkge1xyXG4gICAgdmFyIGRlZmVycmVkID0gJHEuZGVmZXIoKTtcclxuICAgIFxyXG4gICAgJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKGRhdGEpO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgIGRlZmVycmVkLnJlamVjdChlcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTsgXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHNlcnZpY2U7IFxyXG4gIH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JyxcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5tYXAnKVxyXG5cclxuXHQuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG5cdCAgJHJvdXRlUHJvdmlkZXJcclxuXHQgICAgLndoZW4oJy9tYXAnLCB7XHJcblx0ICAgICAgY29udHJvbGxlcjogJ21hcHMnLFxyXG5cdCAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9nb29nbGUtbWFwcy9tYXAuaHRtbCcsXHJcblx0ICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcblx0ICAgIH0pXHJcblx0fV0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JyxcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5tYXAnKVxyXG5cclxuXHQuY29udHJvbGxlcignbWFwcycsIG1hcHMpO1xyXG5cclxuXHRmdW5jdGlvbiBtYXBzKCkge1xyXG5cclxuXHRjb25zb2xlLmxvZygnYm9vbScpO1xyXG5cdGFwcGVuZEdvb2dsZU1hcHNBUEkoKTtcclxuXHJcblx0ZnVuY3Rpb24gYXBwZW5kR29vZ2xlTWFwc0FQSSgpIHtcclxuXHRcdHZhciBnb29nbGVBcGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuXHRcdGdvb2dsZUFwaS5zcmMgPSAnaHR0cDovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvanMnO1xyXG5cdFx0Z29vZ2xlQXBpLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBpbml0aWFsaXplKTtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5hcHBlbmRDaGlsZChnb29nbGVBcGkpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcclxuXHRcdGNvbnNvbGUubG9nKCdpbml0aWFsaXplJyk7XHJcblx0ICB2YXIgbWFwUHJvcCA9IHtcclxuXHQgICAgY2VudGVyOm5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTEuNTA4NzQyLC0wLjEyMDg1MCksXHJcblx0ICAgIHpvb206NSxcclxuXHQgICAgbWFwVHlwZUlkOmdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQXHJcblx0ICB9O1xyXG5cdCAgdmFyIG1hcD1uZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ29vZ2xlTWFwXCIpLCBtYXBQcm9wKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0XHQvLyBpbml0TWFwKCk7XHJcblxyXG5cdFx0Ly8gZnVuY3Rpb24gaW5pdE1hcCgpIHtcclxuXHRcdC8vICAgLy8gQ3JlYXRlIGEgbWFwIG9iamVjdCBhbmQgc3BlY2lmeSB0aGUgRE9NIGVsZW1lbnQgZm9yIGRpc3BsYXkuXHJcblx0XHQvLyAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXAnKSwge1xyXG5cdFx0Ly8gICAgIGNlbnRlcjoge2xhdDogLTM0LjM5NywgbG5nOiAxNTAuNjQ0fSxcclxuXHRcdC8vICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcblx0XHQvLyAgICAgem9vbTogOFxyXG5cdFx0Ly8gICB9KTtcclxuXHRcdC8vIH1cclxuXHR9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG5cdGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG5cdC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblx0ICAkcm91dGVQcm92aWRlclxyXG5cdCAgICAud2hlbignL2pvdXJuZXlwbGFubmVyJywge1xyXG5cdCAgICAgIGNvbnRyb2xsZXI6ICdqb3VybmV5UGxhbm5lcicsXHJcblx0ICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2pvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmh0bWwnLFxyXG5cdCAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG5cdCAgICB9KVxyXG5cdH1dKTtcclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuICAuY29udHJvbGxlcignam91cm5leVBsYW5uZXInLCBqb3VybmV5UGxhbm5lcik7XHJcblxyXG4gIGpvdXJuZXlQbGFubmVyLiRpbmplY3QgPSBbJ2pvdXJuZXlQbGFubmVyRmFjdCcsICckc2NvcGUnLCAnJGxvZycsICckaHR0cCddO1xyXG5cclxuICBmdW5jdGlvbiBqb3VybmV5UGxhbm5lcihqb3VybmV5UGxhbm5lckZhY3QsICRzY29wZSwgJGxvZywgJGh0dHApIHtcclxuICAgXHJcbiAgICAkc2NvcGUucGVyc29uID0gJ01pa2V5cyc7XHJcbiAgICAkc2NvcGUuZ2V0TG9jYXRpb24gPSBnZXRMb2NhdGlvbjtcclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5kZXN0aW5hdGlvbnM7XHJcbiAgICB0aGlzLnByb21pc2VKb3VybmV5ID0gJyc7XHJcbiAgICB0aGlzLmdldEdlb0xvY2F0aW9uID0gZ2V0R2VvTG9jYXRpb247XHJcblxyXG4gICAgLyogZGlyZWN0aXZlIGN1c3RvbWVyIG5hbWUgKi9cclxuICAgIHRoaXMuY3VzdG9tZXIgPSB7XHJcbiAgICAgIG5hbWU6ICdFcmljIENhbnRvbmEnXHJcbiAgICB9XHJcblxyXG4gICAgLyogdGFicyAqL1xyXG4gICAgJHNjb3BlLnRhYnMgPSBbXHJcbiAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgIF07XHJcbiAgICAgICAgIFxyXG4gICAgLyogdHlwZWFoZWFkICovXHJcbiAgICAvKiByZXR1cm5zIGxvY2F0aW9uIGZyb20gcXVlcnkgaW5wdXQgKi9cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRMb2NhdGlvbih2YWwpIHtcclxuICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9TdG9wUG9pbnQvc2VhcmNoJywge1xyXG4gICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgcXVlcnk6IHZhbCxcclxuICAgICAgICAgIG1vZGVzOiAndHViZSdcclxuICAgICAgICB9XHJcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hdGNoZXMubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3RoZXJlIGFzeW5jJywgaXRlbSk7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgIH07XHJcblxyXG4gICAvL3R5cGVhaGVhZCBlbmRcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGUoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZXN0aW5hdGlvbnMnLCB0aGlzLmRlc3RpbmF0aW9ucyk7XHJcbiAgICAgIGpvdXJuZXlQbGFubmVyRmFjdC5wcm9taXNlSm91cm5leUZlZWQodGhpcy5kZXN0aW5hdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLnByb21pc2VKb3VybmV5ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igd2l0aCBqb3VybmV5JywgcmVwb25zZS5kYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0R2VvTG9jYXRpb24oKSB7XHJcbiAgICAgIGlmKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xyXG4gICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi5nZXRDdXJyZW50UG9zaXRpb24oc2hvd1Bvc2l0aW9uLCBzaG93RXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd1Bvc2l0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEdlb0xvY2F0aW9uIHN1Y2Nlc3MnLCBwb3NpdGlvbik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2dldEdlb0xvY2F0aW9uIHN1Y2Nlc3MgbGF0JywgcG9zaXRpb24uY29vcmRzLmxhdGl0dWRlKTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZ2V0R2VvTG9jYXRpb24gc3VjY2VzcyBsb25nJywgcG9zaXRpb24uY29vcmRzLmxvbmdpdHVkZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd0Vycm9yKGVycm9yKSB7XHJcbiAgICAgICAgc3dpdGNoKGVycm9yLmNvZGUpIHtcclxuICAgICAgICAgICAgY2FzZSBlcnJvci5QRVJNSVNTSU9OX0RFTklFRDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBkZW5pZWQgdGhlIHJlcXVlc3QgZm9yIEdlb2xvY2F0aW9uLlwiKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIGVycm9yLlBPU0lUSU9OX1VOQVZBSUxBQkxFOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2NhdGlvbiBpbmZvcm1hdGlvbiBpcyB1bmF2YWlsYWJsZS5cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBlcnJvci5USU1FT1VUOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJUaGUgcmVxdWVzdCB0byBnZXQgdXNlciBsb2NhdGlvbiB0aW1lZCBvdXQuXCIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgZXJyb3IuVU5LTk9XTl9FUlJPUjpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZC5cIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG4gIC5kaXJlY3RpdmUoJ215Q3VzdG9tZXInLCBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRlbXBsYXRlOiAnTmFtZSB7eyAgam91cm5leXBsYW5uZXIuY3VzdG9tZXIubmFtZSB9fSdcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JyxcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLmpvdXJuZXlwbGFubmVyJylcclxuXHJcblx0LmZhY3RvcnkoJ2pvdXJuZXlQbGFubmVyRmFjdCcsIGpvdXJuZXlQbGFubmVyRmFjdCk7XHJcblxyXG5cdGpvdXJuZXlQbGFubmVyRmFjdC4kaW5qZWN0ID0gWyckaHR0cCddO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGpvdXJuZXlQbGFubmVyRmFjdCgkaHR0cCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHByb21pc2VKb3VybmV5RmVlZDogZnVuY3Rpb24oZGVzdGluYXRpb25zKSB7XHJcbiAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGRlc3RpbmF0aW9ucy5mcm9tLmljc0lkICsgJy90by8nICsgZGVzdGluYXRpb25zLnRvLmljc0lkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICBcdH1cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxyXG5cclxuICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL3Bvc3RzJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvcG9zdHMvcG9zdHMuaHRtbCcsXHJcbiAgICAgIGNvbnRyb2xsZXI6ICdwb3N0c0N0cmwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgIH0pO1xyXG4gIH1dKVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnLFxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxyXG5cdC5jb250cm9sbGVyKCdwb3N0c0N0cmwnLCBwb3N0c0N0cmwpO1xyXG5cclxuICBwb3N0c0N0cmwuJGluamVjdCA9IFsncG9zdHMnXTtcclxuICBcclxuICBmdW5jdGlvbiBwb3N0c0N0cmwocG9zdHMpe1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgcG9zdHMucG9zdHMoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgIHNlbGYucG9zdHMgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgfSwgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgIH0pO1xyXG4gIH1cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxyXG5cclxuICAuZmFjdG9yeSgncG9zdHMnLCBwb3N0cyk7XHJcbiAgcG9zdHMuJGluamVjdCA9IFsnJGh0dHAnLCAnbXlDb25maWcnXTtcclxuXHJcbiAgZnVuY3Rpb24gcG9zdHMoJGh0dHAsIG15Q29uZmlnKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgIHBvc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1Bvc3RzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXHJcblxyXG5cdC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblx0ICAkcm91dGVQcm92aWRlci53aGVuKCcvc3RhcndhcnMnLCB7XHJcblx0ICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9zdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuaHRtbCcsXHJcblx0ICAgIGNvbnRyb2xsZXI6ICdzdGFyd2FycycsXHJcblx0ICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG5cdCAgfSk7XHJcblx0fV0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnO1xyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JylcclxuXHJcblx0LmNvbnRyb2xsZXIoJ3N0YXJ3YXJzJywgc3RhcndhcnMpO1xyXG5cclxuXHRzdGFyd2Fycy4kaW5qZWN0ID0gWydieWxpbmVBbmltJywgJyRzY29wZScsICckbG9jYXRpb24nXTtcclxuXHJcblx0ZnVuY3Rpb24gc3RhcndhcnMoYnlsaW5lLCAkc2NvcGUsICRsb2NhdGlvbikge1xyXG5cdFx0JHNjb3BlLmJ5bGluZTtcclxuXHRcdCRzY29wZS5hbmltYXRpb25FbmQgPSBhbmltYXRpb25FbmQ7XHJcblx0XHRmdW5jdGlvbiBhbmltYXRpb25FbmQoKXtcclxuXHRcdFx0ZnVuY3Rpb24gbXlTY3JpcHQoKSB7IFxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhbmltIGlzIHdvcmtpbmcgd2Fob29vIScsICRsb2NhdGlvbi5wYXRoKCkpO1xyXG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvdGVybWluYWx0ZXh0Jyk7XHJcblx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXJ0aW4nKS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIG15U2NyaXB0KTtcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5zdGFyd2Fyc1RleHQnKVxyXG5cdFxyXG5cdC5zZXJ2aWNlKCdieWxpbmVBbmltJywgYnlsaW5lQW5pbSk7XHJcblxyXG5cdGZ1bmN0aW9uIGJ5bGluZUFuaW0oKXsgXHJcblxyXG5cdFx0LypcclxuXHRcdFx0VGhlIGZvbGxvd2luZyBKUyB0YWtlcyBpbiB0aGUgYnlsaW5lIGFuZCBzcGxpdHMgaXQgaW50byBsZXR0ZXJzLCBlYWNoIG9uZSB3cmFwcGVkIGluIGEgc3Bhbi4gV2UgbmVlZCB0byBjcmVhdGUgdGhlIHNwYW5zIGFzIG5vZGVzLCB3ZSBjYW4ndCBqdXN0IGFkZCB0aGVtIHRvIHRoZSBIVE1MIHVzaW5nIGlubmVySFRNTCwgYXMgdG8gZG8gc28gd291bGQgbWVhbiB0aGUgQ1NTIHdvbid0IGFmZmVjdCB0aGUgc3BhbiBiZWNhdXNlIGl0IGRvZXNuJ3QgcmVjb2duaXNlIHRoZSB0YWcgYXMgZXhpc3RpbmcuIEl0J3MgYW4gb2xkIHByb2JsZW0gd2UgcnVuIGludG8gdGltZSBhbmQgYWdhaW4uXHJcblx0XHQqL1xyXG5cclxuXHRcdFx0dmFyIGJ5bGluZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdieWxpbmUnKTsgIFx0Ly8gRmluZCB0aGUgSDJcclxuXHRcdFx0dmFyIGJ5bGluZVRleHQgPSBieWxpbmUuaW5uZXJIVE1MO1x0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBjb250ZW50IG9mIHRoZSBIMlxyXG5cdFx0XHR2YXIgYnlsaW5lQXJyID0gYnlsaW5lVGV4dC5zcGxpdCgnJyk7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BsaXQgY29udGVudCBpbnRvIGFycmF5XHJcblx0XHRcdGJ5bGluZS5pbm5lckhUTUwgPSAnJztcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gRW1wdHkgY3VycmVudCBjb250ZW50XHJcblxyXG5cdFx0XHR2YXIgc3BhbjtcdFx0XHRcdFx0Ly8gQ3JlYXRlIHZhcmlhYmxlcyB0byBjcmVhdGUgZWxlbWVudHNcclxuXHRcdFx0dmFyIGxldHRlcjtcclxuXHJcblx0XHRcdGZvcih2YXIgaT0wO2k8YnlsaW5lQXJyLmxlbmd0aDtpKyspe1x0XHRcdFx0XHRcdFx0XHRcdC8vIExvb3AgZm9yIGV2ZXJ5IGxldHRlclxyXG5cdFx0XHQgIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgPHNwYW4+IGVsZW1lbnRcclxuXHRcdFx0ICBsZXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShieWxpbmVBcnJbaV0pO1x0Ly8gQ3JlYXRlIHRoZSBsZXR0ZXJcclxuXHRcdFx0ICBpZihieWxpbmVBcnJbaV0gPT0gJyAnKSB7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gSWYgdGhlIGxldHRlciBpcyBhIHNwYWNlLi4uXHJcblx0XHRcdCAgICBieWxpbmUuYXBwZW5kQ2hpbGQobGV0dGVyKTtcdFx0XHRcdFx0Ly8gLi4uQWRkIHRoZSBzcGFjZSB3aXRob3V0IGEgc3BhblxyXG5cdFx0XHQgIH0gZWxzZSB7XHJcblx0XHRcdFx0XHRzcGFuLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdFx0Ly8gQWRkIHRoZSBsZXR0ZXIgdG8gdGhlIHNwYW5cclxuXHRcdFx0ICBcdGJ5bGluZS5hcHBlbmRDaGlsZChzcGFuKTsgXHRcdFx0XHRcdC8vIEFkZCB0aGUgc3BhbiB0byB0aGUgaDJcclxuXHRcdFx0ICB9XHJcblx0XHRcdH1cclxuXHJcblx0fVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy90ZXJtaW5hbHRleHQnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0Lmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyOiAnVGVybWluYWxUZXh0Q3RybCcsXHJcbiAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgfSk7XHJcbiAgfV0pO1xyXG4gIFxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnKVxyXG5cclxuICAuY29udHJvbGxlcignVGVybWluYWxUZXh0Q3RybCcsIFRlcm1pbmFsVGV4dEN0cmwpO1xyXG5cclxuICBUZXJtaW5hbFRleHRDdHJsLiRpbmplY3QgPSBbJ3ZpZXcxRmFjdCcsICd0ZXJtaW5hbFRleHQnLCAnJHNjb3BlJywgJyR0aW1lb3V0JywgJyRsb2NhdGlvbiddO1xyXG5cclxuICBmdW5jdGlvbiBUZXJtaW5hbFRleHRDdHJsKHZpZXcxRmFjdCwgdGVybWluYWxUZXh0LCAkc2NvcGUsICR0aW1lb3V0LCAkbG9jYXRpb24pIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IGppbWJvID0gJ3NvbWV0aGluZyc7XHJcbiAgICAgIHRoaXMudGVybWluYWxUZXh0ID0gdGVybWluYWxUZXh0LnRlcm1pbmFsKCcudGVybWluYWwnKTtcclxuICAgICAgdmlldzFGYWN0LnBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHNlbGYuaG9tZXBhZ2UgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndmlldzFGYWN0IGNvbnRyb2xsZXIgbm90IHdvcmtpbmcgJywgcmVhc29uKTtcclxuICAgICAgfSk7XHJcbiAgICAgICRzY29wZS4kb24oJ3Rlcm1pbmFsVGV4dEZpbmlzaCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdicm9hZGNhc3QgaGFzIHdvcmtlZCcpO1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICRzY29wZS5zZXRIb21lQnRuID0gdHJ1ZTtcclxuICAgICAgICB9LCAyMDAwKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMucGVla0J0bkNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3BlZWthYm9vJyk7XHJcbiAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9hYm91dCcpO1xyXG4gICAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXHJcbiAgXHJcbiAgLmZhY3RvcnkoJ3Rlcm1pbmFsVGV4dCcsIHRlcm1pbmFsdGV4dCk7XHJcbiAgdGVybWluYWx0ZXh0LiRpbmplY3QgPSBbJyRxJywgJyRpbnRlcnZhbCcsICckdGltZW91dCcsICckcm9vdFNjb3BlJ107XHJcblxyXG4gIGZ1bmN0aW9uIHRlcm1pbmFsdGV4dCgkcSwgJGludGVydmFsLCAkdGltZW91dCwgJHJvb3RTY29wZSkge1xyXG4gICBcclxuICAgIHZhciBkZWxheSA9IDIwMDA7XHJcbiAgICB2YXIgaXRlcmF0b3I7XHJcbiAgICB2YXIgYmxpbmtMZXR0ZXJzO1xyXG4gICAgdmFyIGJsaW5rTGV0dGVyc0NsYXNzO1xyXG4gICAgdmFyIHRlcm1pbmFsVGV4dDE7XHJcbiAgICB2YXIgYW5pbWF0aW9uVGV4dDtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBBbmltYXRlcyB0aGUgYmxpbmsgdGV4dFxyXG4gICAgICAgKiBAcGFyYW0gY2xhc3MgY29udGFpbmluZyB0aGUgdGV4dCB0byBhbmltYXRlLlxyXG4gICAgICAgKiAkc2NvcGUuJGVtaXRzIHRlcm1pbmFsVGV4dEZpbmlzaCBhZnRlciBmdW5jdGlvbiBmaW5pc2hlcy5cclxuICAgICAgICovXHJcbiAgICBmdW5jdGlvbiBzZXRCbGlua3kodGV4dCkgeyBcclxuXHJcbiAgICAgIGJsaW5rTGV0dGVyc0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0ZXh0KTtcclxuICAgICAgYmxpbmtMZXR0ZXJzID0gYmxpbmtMZXR0ZXJzQ2xhc3MuaW5uZXJIVE1MO1xyXG4gICAgICBhbmltYXRpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hdGlvblRleHQnKTtcclxuICAgICAgYmxpbmtMZXR0ZXJzQ2xhc3MuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidGVybWluYWxUZXh0MVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImJsaW5rXCI+JiN4N2M7PC9zcGFuPic7XHJcblxyXG4gICAgICB2YXIgYmxpbmtQaXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsaW5rJyk7XHJcblxyXG4gICAgICB2YXIgYmxpbmsgPSAkaW50ZXJ2YWwoIGZ1bmN0aW9uKCkgeyBpZiAoYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPT0gMCB8fCBibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9PSAnJyApIHsgYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPSAxIH0gZWxzZSB7YmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPSAwIH19LCA2MDApO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEFuaW1hdGVzIHRocm91Z2ggdGhlIHN0cmluZy4gU2V0cyB0aGUgc2V0VGltZW91dCBmdW5jdGlvbi5cclxuICAgICAgICovXHJcblxyXG4gICAgICAgZnVuY3Rpb24gYW5pbWF0ZUJsaW5rKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGJsaW5rTGV0dGVycy5sZW5ndGgrMTsgaSsrKSB7XHJcbiAgICAgICAgICBpZiggaSA9PSBibGlua0xldHRlcnMubGVuZ3RoICsgMSApIHtcclxuICAgICAgICAgICAgZGVsYXkgPSBkZWxheSArIDEwMDA7XHJcbiAgICAgICAgICAgIHNldENhbGxCYWNrVGltZU91dChkZWxheSk7IFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGF5ID0gZGVsYXkgKyA1MDA7XHJcbiAgICAgICAgICBzZXRUaGVUaW1lb3V0KGksZGVsYXkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBTZXRzIGNhbGxiYWNrIHRvIGFuaW1hdGVCbGluayBmdW5jdGlvblxyXG4gICAgICAgKi9cclxuICAgICAgIGZ1bmN0aW9uIHNldENhbGxCYWNrVGltZU91dChkZWxheSkge1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdGVybWluYWxUZXh0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXJtaW5hbFRleHQxJyk7XHJcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUudG9wID0gJzUwJSc7XHJcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLmxlZnQgPSAnNTAlJztcclxuICAgICAgICAgIHRlcm1pbmFsVGV4dDEuY2xhc3NOYW1lICs9ICcgY2VudGVyVGV4dEFmdGVyQW5pbSc7XHJcbiAgICAgICAgICBibGlua1BpcGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChibGlua1BpcGUpO1xyXG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd0ZXJtaW5hbFRleHRGaW5pc2gnKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogSXRlcmF0b3JzIHRoZSBzZXRUaW1lb3V0IGZvciBhbmltYXRpb24uXHJcbiAgICAgICAqL1xyXG4gICAgICAgZnVuY3Rpb24gc2V0VGhlVGltZW91dChpdGVyYXRvciwgZGVsYXkpIHtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlcm1pbmFsVGV4dDEnKS5pbm5lckhUTUwgPSBibGlua0xldHRlcnMuc3Vic3RyKDAsIGl0ZXJhdG9yKTtcclxuICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBhbmltYXRlQmxpbmsoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGVybWluYWw6IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICBzZXRCbGlua3kodGV4dClcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnKVxyXG5cclxuICAuZmFjdG9yeSgndmlldzFGYWN0JywgdmlldzFGYWN0KTtcclxuXHJcbiAgdmlldzFGYWN0LiRpbmplY3QgPSBbJyRodHRwJywgJ215Q29uZmlnJ107XHJcblxyXG4gIGZ1bmN0aW9uIHZpZXcxRmFjdCgkaHR0cCwgbXlDb25maWcpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZXdNZXNzYWdlOiAnbm9vb28nLFxyXG5cclxuICAgICAgcGFnZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQobXlDb25maWcud29yZHByZXNzUGFnZXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4ndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAudHViZXN0YXR1c2VzJylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL3R1YmVzdGF0dXNlcycsIHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ3R1YmVzdGF0dXNlc0N0cmwnLFxyXG4gICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgfSlcclxuICB9XSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC50dWJlc3RhdHVzZXMnKVxyXG5cclxuICAuY29udHJvbGxlcigndHViZXN0YXR1c2VzQ3RybCcsIHR1YmVzdGF0dXNlc0N0cmwpO1xyXG5cclxuICB0dWJlc3RhdHVzZXNDdHJsLiRpbmplY3QgPSBbJ3R1YmVzdGF0dXNlc1RmbCddO1xyXG5cclxuICBmdW5jdGlvbiB0dWJlc3RhdHVzZXNDdHJsKHR1YmVzdGF0dXNlc1RmbCkge1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMubWVzc2FnZSA9ICdoZWxsb28gbW9ua2V5JztcclxuICAgIHRoaXMudmlld01zZyA9IHR1YmVzdGF0dXNlc1RmbC5tZXNzYWdlO1xyXG5cclxuICAgICAgdHViZXN0YXR1c2VzVGZsLnRmbCgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLnRmbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5mYWN0b3J5KCd0dWJlc3RhdHVzZXNUZmwnLCB0dWJlc3RhdHVzZXNUZmwpO1xyXG5cclxuICB0dWJlc3RhdHVzZXNUZmwuJGluamVjdCA9IFsnJGh0dHAnXTtcclxuXHJcbiAgZnVuY3Rpb24gdHViZXN0YXR1c2VzVGZsKCRodHRwKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZTogJ3NvbWVib2R5IHN0b3AgbWUhJyxcclxuXHJcbiAgICAgIHRmbCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvbGluZS9tb2RlL3R1YmUvc3RhdHVzJywge1xyXG4gICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGFwaV9pZDogJzFhM2ZmYmQyJyxcclxuICAgICAgICAgICAgYXBpX2tleTogJzJhZGZiMDIwMDFhZGZlZmEwNjhmN2E3NDg2Mjg1NGU2J1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
