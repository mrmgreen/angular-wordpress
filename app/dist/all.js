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
       
  /* typeahead */
  /* returns location from query input */
    $scope.getLocation = function(val) {
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

      var self = this;
      this.destinations;
      this.promiseJourney = '';

      this.update = function() {
        console.log('destinations', this.destinations);
        journeyPlannerFact.promiseJourneyFeed(this.destinations).then(function(response) {
          self.promiseJourney = response.data;
        }, function(response) {
          console.log('error with journey', reponse.data);
        });
      };
      
      /* directive customer name */
      this.customer = {
        name: 'Eric'
      }

      /* tabs */
      $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
      ];
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
		// $scope.test = function() { $location.path('/terminaltext'); }
		// $scope.test();
		$scope.byline;
		$scope.animationEnd = function(){
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmNvbmZpZy5qcyIsImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmNvbnRyb2xsZXIuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5kaXJlY3RpdmUuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5mYWN0b3J5LmpzIiwicG9zdHMvcG9zdHMuY29uZmlnLmpzIiwicG9zdHMvcG9zdHMuY29udHJvbGxlci5qcyIsInBvc3RzL3Bvc3RzLmZhY3RvcnkuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuY29uZmlnLmpzIiwic3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmNvbnRyb2xsZXIuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuc2VydmljZS5qcyIsInRlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuY29uZmlnLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5jb250cm9sbGVyLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5mYWN0b3J5LnRleHQuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmZhY3RvcnkudmlldzFmYWN0LmpzIiwidHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5jb25maWcuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmNvbnRyb2xsZXIuanMiLCJ0dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG4uY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAud2hlbignL2pvdXJuZXlwbGFubmVyJywge1xyXG4gICAgICBjb250cm9sbGVyOiAnam91cm5leVBsYW5uZXInLFxyXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvam91cm5leXBsYW5uZXIvam91cm5leXBsYW5uZXIuaHRtbCcsXHJcbiAgICAgIGNvbnRyb2xsZXJBczogJ2pvdXJuZXlwbGFubmVyJ1xyXG4gICAgfSlcclxufV0pO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAuam91cm5leXBsYW5uZXInKVxyXG5cclxuICAuY29udHJvbGxlcignam91cm5leVBsYW5uZXInLFsnam91cm5leVBsYW5uZXJGYWN0JywgJyRzY29wZScsICckbG9nJywgJyRodHRwJywgZnVuY3Rpb24oam91cm5leVBsYW5uZXJGYWN0LCAkc2NvcGUsICRsb2csICRodHRwKSB7XHJcbiAgIFxyXG4gICAgICAgJHNjb3BlLnBlcnNvbiA9ICdNaWtleSc7XHJcbiAgICAgICBcclxuICAvKiB0eXBlYWhlYWQgKi9cclxuICAvKiByZXR1cm5zIGxvY2F0aW9uIGZyb20gcXVlcnkgaW5wdXQgKi9cclxuICAgICRzY29wZS5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL1N0b3BQb2ludC9zZWFyY2gnLCB7XHJcbiAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICBxdWVyeTogdmFsLFxyXG4gICAgICAgICAgbW9kZXM6ICd0dWJlJ1xyXG4gICAgICAgIH1cclxuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGEubWF0Y2hlcy5tYXAoZnVuY3Rpb24oaXRlbSl7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZygndGhlcmUgYXN5bmMnLCBpdGVtKTtcclxuICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgICAvL3R5cGVhaGVhZCBlbmRcclxuXHJcbiAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgdGhpcy5kZXN0aW5hdGlvbnM7XHJcbiAgICAgIHRoaXMucHJvbWlzZUpvdXJuZXkgPSAnJztcclxuXHJcbiAgICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2Rlc3RpbmF0aW9ucycsIHRoaXMuZGVzdGluYXRpb25zKTtcclxuICAgICAgICBqb3VybmV5UGxhbm5lckZhY3QucHJvbWlzZUpvdXJuZXlGZWVkKHRoaXMuZGVzdGluYXRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICBzZWxmLnByb21pc2VKb3VybmV5ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yIHdpdGggam91cm5leScsIHJlcG9uc2UuZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH07XHJcbiAgICAgIFxyXG4gICAgICAvKiBkaXJlY3RpdmUgY3VzdG9tZXIgbmFtZSAqL1xyXG4gICAgICB0aGlzLmN1c3RvbWVyID0ge1xyXG4gICAgICAgIG5hbWU6ICdFcmljJ1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiB0YWJzICovXHJcbiAgICAgICRzY29wZS50YWJzID0gW1xyXG4gICAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMicsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAyJywgZGlzYWJsZWQ6IHRydWUgfVxyXG4gICAgICBdO1xyXG4gIH1dKVxyXG5cclxufSkoKTtcclxuXHJcbiIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCcsXHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG4gIC5kaXJlY3RpdmUoJ215Q3VzdG9tZXInLCBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRlbXBsYXRlOiAnTmFtZSB7eyAgam91cm5leXBsYW5uZXIuY3VzdG9tZXIubmFtZSB9fSdcclxuICAgIH07XHJcbiAgfSk7XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JyxcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicpXHJcblxyXG4gIC5mYWN0b3J5KCdqb3VybmV5UGxhbm5lckZhY3QnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcHJvbWlzZUpvdXJuZXlGZWVkOiBmdW5jdGlvbihkZXN0aW5hdGlvbnMpIHtcclxuICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZGVzdGluYXRpb25zLmZyb20uaWNzSWQgKyAnL3RvLycgKyBkZXN0aW5hdGlvbnMudG8uaWNzSWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gIH1dKTtcclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxyXG5cclxuICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL3Bvc3RzJywge1xyXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvcG9zdHMvcG9zdHMuaHRtbCcsXHJcbiAgICAgIGNvbnRyb2xsZXI6ICdwb3N0c0N0cmwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICdwb3N0cydcclxuICAgIH0pO1xyXG4gIH1dKVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblx0J3VzZSBzdHJpY3QnLFxyXG5cclxuXHRhbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnKVxyXG5cdC5jb250cm9sbGVyKCdwb3N0c0N0cmwnLCBwb3N0c0N0cmwpO1xyXG5cclxuICBmdW5jdGlvbiBwb3N0c0N0cmwocG9zdHMpe1xyXG4gICAgdGhpcy5ob3dkeSA9ICdtZXNzYWdlIG1lIGNvdWxkIHlhbCB0byc7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBwb3N0cy5wb3N0cygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgc2VsZi5wb3N0cyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9LCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIGFuZ3VsYXIubW9kdWxlKCdteUFwcC5wb3N0cycpXHJcblxyXG4gIC5mYWN0b3J5KCdwb3N0cycsIFsnJGh0dHAnLCAnbXlDb25maWcnLCBmdW5jdGlvbigkaHR0cCwgbXlDb25maWcgKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuXHJcbiAgICAgIHBvc3RzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1Bvc3RzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXHJcblxyXG5cdC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcblx0ICAkcm91dGVQcm92aWRlci53aGVuKCcvc3RhcndhcnMnLCB7XHJcblx0ICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9zdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuaHRtbCcsXHJcblx0ICAgIGNvbnRyb2xsZXI6ICdzdGFyd2FycycsXHJcblx0ICAgIGNvbnRyb2xsZXJBczogJ3N0YXJ3YXJzVGV4dCdcclxuXHQgIH0pO1xyXG5cdH1dKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cdCd1c2Ugc3RyaWN0JztcclxuXHJcblx0YW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcpXHJcblxyXG5cdC5jb250cm9sbGVyKCdzdGFyd2FycycsIFsnYnlsaW5lQW5pbScsICckc2NvcGUnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oYnlsaW5lLCAkc2NvcGUsICRsb2NhdGlvbikge1xyXG5cdFx0Ly8gJHNjb3BlLnRlc3QgPSBmdW5jdGlvbigpIHsgJGxvY2F0aW9uLnBhdGgoJy90ZXJtaW5hbHRleHQnKTsgfVxyXG5cdFx0Ly8gJHNjb3BlLnRlc3QoKTtcclxuXHRcdCRzY29wZS5ieWxpbmU7XHJcblx0XHQkc2NvcGUuYW5pbWF0aW9uRW5kID0gZnVuY3Rpb24oKXtcclxuXHRcdFx0ZnVuY3Rpb24gbXlTY3JpcHQoKSB7IFxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdhbmltIGlzIHdvcmtpbmcgd2Fob29vIScsICRsb2NhdGlvbi5wYXRoKCkpO1xyXG5cdFx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvdGVybWluYWx0ZXh0Jyk7XHJcblx0XHRcdFx0JHNjb3BlLiRhcHBseSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXJ0aW4nKS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIG15U2NyaXB0KTtcclxuXHRcdH1cclxuXHJcblx0fV0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC5zdGFyd2Fyc1RleHQnKVxyXG5cclxuXHQuc2VydmljZSgnYnlsaW5lQW5pbScsIGZ1bmN0aW9uKCl7IFxyXG5cclxuXHRcdC8qXHJcblx0XHRcdFRoZSBmb2xsb3dpbmcgSlMgdGFrZXMgaW4gdGhlIGJ5bGluZSBhbmQgc3BsaXRzIGl0IGludG8gbGV0dGVycywgZWFjaCBvbmUgd3JhcHBlZCBpbiBhIHNwYW4uIFdlIG5lZWQgdG8gY3JlYXRlIHRoZSBzcGFucyBhcyBub2Rlcywgd2UgY2FuJ3QganVzdCBhZGQgdGhlbSB0byB0aGUgSFRNTCB1c2luZyBpbm5lckhUTUwsIGFzIHRvIGRvIHNvIHdvdWxkIG1lYW4gdGhlIENTUyB3b24ndCBhZmZlY3QgdGhlIHNwYW4gYmVjYXVzZSBpdCBkb2Vzbid0IHJlY29nbmlzZSB0aGUgdGFnIGFzIGV4aXN0aW5nLiBJdCdzIGFuIG9sZCBwcm9ibGVtIHdlIHJ1biBpbnRvIHRpbWUgYW5kIGFnYWluLlxyXG5cdFx0Ki9cclxuXHJcblx0XHRcdHZhciBieWxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlsaW5lJyk7ICBcdC8vIEZpbmQgdGhlIEgyXHJcblx0XHRcdHZhciBieWxpbmVUZXh0ID0gYnlsaW5lLmlubmVySFRNTDtcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEdldCB0aGUgY29udGVudCBvZiB0aGUgSDJcclxuXHRcdFx0dmFyIGJ5bGluZUFyciA9IGJ5bGluZVRleHQuc3BsaXQoJycpO1x0XHRcdFx0XHRcdFx0XHRcdC8vIFNwbGl0IGNvbnRlbnQgaW50byBhcnJheVxyXG5cdFx0XHRieWxpbmUuaW5uZXJIVE1MID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEVtcHR5IGN1cnJlbnQgY29udGVudFxyXG5cclxuXHRcdFx0dmFyIHNwYW47XHRcdFx0XHRcdC8vIENyZWF0ZSB2YXJpYWJsZXMgdG8gY3JlYXRlIGVsZW1lbnRzXHJcblx0XHRcdHZhciBsZXR0ZXI7XHJcblxyXG5cdFx0XHRmb3IodmFyIGk9MDtpPGJ5bGluZUFyci5sZW5ndGg7aSsrKXtcdFx0XHRcdFx0XHRcdFx0XHQvLyBMb29wIGZvciBldmVyeSBsZXR0ZXJcclxuXHRcdFx0ICBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XHRcdFx0XHRcdC8vIENyZWF0ZSBhIDxzcGFuPiBlbGVtZW50XHJcblx0XHRcdCAgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnlsaW5lQXJyW2ldKTtcdC8vIENyZWF0ZSB0aGUgbGV0dGVyXHJcblx0XHRcdCAgaWYoYnlsaW5lQXJyW2ldID09ICcgJykge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBsZXR0ZXIgaXMgYSBzcGFjZS4uLlxyXG5cdFx0XHQgICAgYnlsaW5lLmFwcGVuZENoaWxkKGxldHRlcik7XHRcdFx0XHRcdC8vIC4uLkFkZCB0aGUgc3BhY2Ugd2l0aG91dCBhIHNwYW5cclxuXHRcdFx0ICB9IGVsc2Uge1xyXG5cdFx0XHRcdFx0c3Bhbi5hcHBlbmRDaGlsZChsZXR0ZXIpO1x0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGV0dGVyIHRvIHRoZSBzcGFuXHJcblx0XHRcdCAgXHRieWxpbmUuYXBwZW5kQ2hpbGQoc3Bhbik7IFx0XHRcdFx0XHQvLyBBZGQgdGhlIHNwYW4gdG8gdGhlIGgyXHJcblx0XHRcdCAgfVxyXG5cdFx0XHR9XHJcblxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICRyb3V0ZVByb3ZpZGVyLndoZW4oJy90ZXJtaW5hbHRleHQnLCB7XHJcbiAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0Lmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyOiAnVGVybWluYWxUZXh0Q3RybCcsXHJcbiAgICAgIGNvbnRyb2xsZXJBczogJ3Rlcm1pbmFsdGV4dCdcclxuICAgIH0pO1xyXG4gIH1dKTtcclxuICBcclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcbiAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICBhbmd1bGFyLm1vZHVsZSgnbXlBcHAudGVybWluYWx0ZXh0JylcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ1Rlcm1pbmFsVGV4dEN0cmwnLCBbJ3ZpZXcxRmFjdCcsICd0ZXJtaW5hbFRleHQnLCAnJHNjb3BlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24odmlldzFGYWN0LCB0ZXJtaW5hbFRleHQsICRzY29wZSwgJHRpbWVvdXQpIHtcclxuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICB0aGlzLnRlcm1pbmFsVGV4dCA9IHRlcm1pbmFsVGV4dC50ZXJtaW5hbCgnLnRlcm1pbmFsJyk7XHJcbiAgICAgIHZpZXcxRmFjdC5wYWdlcygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLmhvbWVwYWdlID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZpZXcxRmFjdCBjb250cm9sbGVyIG5vdCB3b3JraW5nICcsIHJlYXNvbik7XHJcbiAgICAgIH0pO1xyXG4gICAgICAkc2NvcGUuJG9uKCd0ZXJtaW5hbFRleHRGaW5pc2gnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnYnJvYWRjYXN0IGhhcyB3b3JrZWQnKTtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkc2NvcGUuc2V0SG9tZUJ0biA9IHRydWU7XHJcbiAgICAgICAgfSwgMjAwMCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnBlZWtCdG5DbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIFxyXG4gICAgICB9XHJcblxyXG4gIH1dKTtcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXHJcbiAgXHJcbiAgLmZhY3RvcnkoJ3Rlcm1pbmFsVGV4dCcsIFsnJHEnLCAnJGludGVydmFsJywgJyR0aW1lb3V0JywgJyRyb290U2NvcGUnLCBmdW5jdGlvbigkcSwgJGludGVydmFsLCAkdGltZW91dCwgJHJvb3RTY29wZSkge1xyXG4gICBcclxuICAgIHZhciBkZWxheSA9IDIwMDA7XHJcbiAgICB2YXIgaXRlcmF0b3I7XHJcbiAgICB2YXIgYmxpbmtMZXR0ZXJzO1xyXG4gICAgdmFyIGJsaW5rTGV0dGVyc0NsYXNzO1xyXG4gICAgdmFyIHRlcm1pbmFsVGV4dDE7XHJcbiAgICB2YXIgYW5pbWF0aW9uVGV4dDtcclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBBbmltYXRlcyB0aGUgYmxpbmsgdGV4dFxyXG4gICAgICAgKiBAcGFyYW0gY2xhc3MgY29udGFpbmluZyB0aGUgdGV4dCB0byBhbmltYXRlLlxyXG4gICAgICAgKiAkc2NvcGUuJGVtaXRzIHRlcm1pbmFsVGV4dEZpbmlzaCBhZnRlciBmdW5jdGlvbiBmaW5pc2hlcy5cclxuICAgICAgICovXHJcbiAgICBmdW5jdGlvbiBzZXRCbGlua3kodGV4dCkgeyBcclxuXHJcbiAgICAgIGJsaW5rTGV0dGVyc0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0ZXh0KTtcclxuICAgICAgYmxpbmtMZXR0ZXJzID0gYmxpbmtMZXR0ZXJzQ2xhc3MuaW5uZXJIVE1MO1xyXG4gICAgICBhbmltYXRpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hdGlvblRleHQnKTtcclxuICAgICAgYmxpbmtMZXR0ZXJzQ2xhc3MuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidGVybWluYWxUZXh0MVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImJsaW5rXCI+JiN4N2M7PC9zcGFuPic7XHJcblxyXG4gICAgICB2YXIgYmxpbmtQaXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsaW5rJyk7XHJcblxyXG4gICAgICB2YXIgYmxpbmsgPSAkaW50ZXJ2YWwoIGZ1bmN0aW9uKCkgeyBpZiAoYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPT0gMCB8fCBibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9PSAnJyApIHsgYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPSAxIH0gZWxzZSB7YmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPSAwIH19LCA2MDApO1xyXG5cclxuICAgICAgLyoqXHJcbiAgICAgICAqIEFuaW1hdGVzIHRocm91Z2ggdGhlIHN0cmluZy4gU2V0cyB0aGUgc2V0VGltZW91dCBmdW5jdGlvbi5cclxuICAgICAgICovXHJcblxyXG4gICAgICAgZnVuY3Rpb24gYW5pbWF0ZUJsaW5rKCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGJsaW5rTGV0dGVycy5sZW5ndGgrMTsgaSsrKSB7XHJcbiAgICAgICAgICBpZiggaSA9PSBibGlua0xldHRlcnMubGVuZ3RoICsgMSApIHtcclxuICAgICAgICAgICAgZGVsYXkgPSBkZWxheSArIDEwMDA7XHJcbiAgICAgICAgICAgIHNldENhbGxCYWNrVGltZU91dChkZWxheSk7IFxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRlbGF5ID0gZGVsYXkgKyA1MDA7XHJcbiAgICAgICAgICBzZXRUaGVUaW1lb3V0KGksZGVsYXkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgIH1cclxuXHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBTZXRzIGNhbGxiYWNrIHRvIGFuaW1hdGVCbGluayBmdW5jdGlvblxyXG4gICAgICAgKi9cclxuICAgICAgIGZ1bmN0aW9uIHNldENhbGxCYWNrVGltZU91dChkZWxheSkge1xyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgdGVybWluYWxUZXh0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXJtaW5hbFRleHQxJyk7XHJcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUudG9wID0gJzUwJSc7XHJcbiAgICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLmxlZnQgPSAnNTAlJztcclxuICAgICAgICAgIHRlcm1pbmFsVGV4dDEuY2xhc3NOYW1lICs9ICcgY2VudGVyVGV4dEFmdGVyQW5pbSc7XHJcbiAgICAgICAgICBibGlua1BpcGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChibGlua1BpcGUpO1xyXG4gICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCd0ZXJtaW5hbFRleHRGaW5pc2gnKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgICB9XHJcblxyXG4gICAgICAvKipcclxuICAgICAgICogSXRlcmF0b3JzIHRoZSBzZXRUaW1lb3V0IGZvciBhbmltYXRpb24uXHJcbiAgICAgICAqL1xyXG4gICAgICAgZnVuY3Rpb24gc2V0VGhlVGltZW91dChpdGVyYXRvciwgZGVsYXkpIHtcclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlcm1pbmFsVGV4dDEnKS5pbm5lckhUTUwgPSBibGlua0xldHRlcnMuc3Vic3RyKDAsIGl0ZXJhdG9yKTtcclxuICAgICAgICAgIH0sIGRlbGF5KTtcclxuICAgICAgIH1cclxuXHJcbiAgICAgICBhbmltYXRlQmxpbmsoKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGVybWluYWw6IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgICBzZXRCbGlua3kodGV4dClcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XSlcclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcpXHJcblxyXG4gIC5mYWN0b3J5KCd2aWV3MUZhY3QnLCBbJyRodHRwJywgJ215Q29uZmlnJywgZnVuY3Rpb24oJGh0dHAsIG15Q29uZmlnKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmV3TWVzc2FnZTogJ25vb29vJyxcclxuXHJcbiAgICAgIHBhZ2VzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKTtcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICB9XSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgLndoZW4oJy90dWJlc3RhdHVzZXMnLCB7XHJcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvdHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5odG1sJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXI6ICd0dWJlc3RhdHVzZXNDdHJsJyxcclxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3R1YmVzdGF0dXNlc1RmbCdcclxuICAgICAgICB9KVxyXG4gIH1dKTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbigpIHtcclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycpXHJcblxyXG4gIC5jb250cm9sbGVyKCd0dWJlc3RhdHVzZXNDdHJsJywgWyd0dWJlc3RhdHVzZXNUZmwnLCBmdW5jdGlvbih0dWJlc3RhdHVzZXNUZmwpIHtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLm1lc3NhZ2UgPSAnaGVsbG9vIG1vbmtleSc7XHJcbiAgICB0aGlzLnZpZXdNc2cgPSB0dWJlc3RhdHVzZXNUZmwubWVzc2FnZTtcclxuXHJcbiAgICAgIHR1YmVzdGF0dXNlc1RmbC50ZmwoKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgc2VsZi50ZmwgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgfSlcclxuXHJcbiAgICB9XSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC50dWJlc3RhdHVzZXMnKVxyXG5cclxuICAuZmFjdG9yeSgndHViZXN0YXR1c2VzVGZsJywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbWVzc2FnZTogJ3NvbWVib2R5IHN0b3AgbWUhJyxcclxuXHJcbiAgICAgIHRmbCA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvbGluZS9tb2RlL3R1YmUvc3RhdHVzJywge1xyXG4gICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgIGFwaV9pZDogJzFhM2ZmYmQyJyxcclxuICAgICAgICAgICAgYXBpX2tleTogJzJhZGZiMDIwMDFhZGZlZmEwNjhmN2E3NDg2Mjg1NGU2J1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfV0pXHJcblxyXG59KSgpO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
