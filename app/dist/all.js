angular.module('myApp.journeyplanner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/journeyplanner', {
      controller: 'journeyPlanner',
      templateUrl: 'components/journeyplanner/journeyplanner.html',
      controllerAs: 'journeyplanner'
    })
}])

.controller('journeyPlanner',['journeyPlannerFact', '$scope', '$log', '$http', function(journeyPlannerFact, $scope, $log, $http) {
 
     $scope.person = 'Mike';
     
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
      name: 'Derek'
    }

    /* tabs */
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
}])

.directive('myCustomer', function() {
  return {
    template: 'Name {{  journeyplanner.customer.name }}'
  };
})

.factory('journeyPlannerFact', ['$http', function($http) {

    return {
      promiseJourneyFeed: function(destinations) {
        return $http.get('https://api.tfl.gov.uk/journey/journeyresults/' + destinations.from.icsId + '/to/' + destinations.to.icsId);
      }
    }
}]);



'use strict';

angular.module('myApp.posts', ['ngRoute', 'myApp.config'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/posts', {
    templateUrl: 'components/posts/posts.html',
    controller: 'postsCtrl',
    controllerAs: 'posts'
  });
}])

.factory('posts', ['$http', 'myConfig', function($http, myConfig ) {

  return {
    message: 'eat me today!',

    posts: function() {
      return $http.get(myConfig.wordpressPosts);
    }

  }
}])

.controller('postsCtrl', ['posts', function(posts) {

    var self = this;
    posts.posts().then(function(response) {
      self.posts = response.data;
    }, function(data) {
      console.log(data);
    })


}]);
'use strict';

angular.module('myApp.starwarsText', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/starwars', {
    templateUrl: 'components/starwars-text-anim/starwars.html',
    controller: 'starwars',
    controllerAs: 'starwarsText'
  });
}])

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

})

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
'use strict';

angular.module('myApp.terminaltext', ['ngRoute', 'ngSanitize', 'myApp.config'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/terminaltext', {
    templateUrl: 'components/terminaltext/terminaltext.html',
    controller: 'TerminalTextCtrl',
    controllerAs: 'terminaltext'
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
'use strict';

angular.module('myApp.tubestatuses', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/tubestatuses', {
          templateUrl: 'components/tubestatuses/tubestatuses.html',
          controller: 'tubestatusesCtrl',
          controllerAs: 'tubestatusesTfl'
        })
  }])

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



//  .controller('tubestatusesCtrl', tubestatusesCtrl)
//
//  .factory('tfl', tfl);
//
//function tubestatusesCtrl() {}
//
//function tfl() {}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmpzIiwicG9zdHMvcG9zdHMuanMiLCJzdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuanMiLCJ0ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0LmpzIiwidHViZXN0YXR1c2VzL3R1YmVzdGF0dXNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicsIFsnbmdSb3V0ZSddKVxyXG5cclxuLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy9qb3VybmV5cGxhbm5lcicsIHtcclxuICAgICAgY29udHJvbGxlcjogJ2pvdXJuZXlQbGFubmVyJyxcclxuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2pvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICdqb3VybmV5cGxhbm5lcidcclxuICAgIH0pXHJcbn1dKVxyXG5cclxuLmNvbnRyb2xsZXIoJ2pvdXJuZXlQbGFubmVyJyxbJ2pvdXJuZXlQbGFubmVyRmFjdCcsICckc2NvcGUnLCAnJGxvZycsICckaHR0cCcsIGZ1bmN0aW9uKGpvdXJuZXlQbGFubmVyRmFjdCwgJHNjb3BlLCAkbG9nLCAkaHR0cCkge1xyXG4gXHJcbiAgICAgJHNjb3BlLnBlcnNvbiA9ICdNaWtlJztcclxuICAgICBcclxuLyogdHlwZWFoZWFkICovXHJcbi8qIHJldHVybnMgbG9jYXRpb24gZnJvbSBxdWVyeSBpbnB1dCAqL1xyXG4gICRzY29wZS5nZXRMb2NhdGlvbiA9IGZ1bmN0aW9uKHZhbCkge1xyXG4gICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9TdG9wUG9pbnQvc2VhcmNoJywge1xyXG4gICAgICBwYXJhbXM6IHtcclxuICAgICAgICBxdWVyeTogdmFsLFxyXG4gICAgICAgIG1vZGVzOiAndHViZSdcclxuICAgICAgfVxyXG4gICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XHJcbiAgICAgIHJldHVybiByZXNwb25zZS5kYXRhLm1hdGNoZXMubWFwKGZ1bmN0aW9uKGl0ZW0pe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGVyZSBhc3luYycsIGl0ZW0pO1xyXG4gICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgLy90eXBlYWhlYWQgZW5kXHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5kZXN0aW5hdGlvbnM7XHJcbiAgICB0aGlzLnByb21pc2VKb3VybmV5ID0gJyc7XHJcblxyXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2Rlc3RpbmF0aW9ucycsIHRoaXMuZGVzdGluYXRpb25zKTtcclxuICAgICAgam91cm5leVBsYW5uZXJGYWN0LnByb21pc2VKb3VybmV5RmVlZCh0aGlzLmRlc3RpbmF0aW9ucykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHNlbGYucHJvbWlzZUpvdXJuZXkgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvciB3aXRoIGpvdXJuZXknLCByZXBvbnNlLmRhdGEpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIC8qIGRpcmVjdGl2ZSBjdXN0b21lciBuYW1lICovXHJcbiAgICB0aGlzLmN1c3RvbWVyID0ge1xyXG4gICAgICBuYW1lOiAnRGVyZWsnXHJcbiAgICB9XHJcblxyXG4gICAgLyogdGFicyAqL1xyXG4gICAgJHNjb3BlLnRhYnMgPSBbXHJcbiAgICAgIHsgdGl0bGU6J0R5bmFtaWMgVGl0bGUgMScsIGNvbnRlbnQ6J0R5bmFtaWMgY29udGVudCAxJyB9LFxyXG4gICAgICB7IHRpdGxlOidEeW5hbWljIFRpdGxlIDInLCBjb250ZW50OidEeW5hbWljIGNvbnRlbnQgMicsIGRpc2FibGVkOiB0cnVlIH1cclxuICAgIF07XHJcbn1dKVxyXG5cclxuLmRpcmVjdGl2ZSgnbXlDdXN0b21lcicsIGZ1bmN0aW9uKCkge1xyXG4gIHJldHVybiB7XHJcbiAgICB0ZW1wbGF0ZTogJ05hbWUge3sgIGpvdXJuZXlwbGFubmVyLmN1c3RvbWVyLm5hbWUgfX0nXHJcbiAgfTtcclxufSlcclxuXHJcbi5mYWN0b3J5KCdqb3VybmV5UGxhbm5lckZhY3QnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBwcm9taXNlSm91cm5leUZlZWQ6IGZ1bmN0aW9uKGRlc3RpbmF0aW9ucykge1xyXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvam91cm5leS9qb3VybmV5cmVzdWx0cy8nICsgZGVzdGluYXRpb25zLmZyb20uaWNzSWQgKyAnL3RvLycgKyBkZXN0aW5hdGlvbnMudG8uaWNzSWQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbn1dKTtcclxuXHJcblxyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAucG9zdHMnLCBbJ25nUm91dGUnLCAnbXlBcHAuY29uZmlnJ10pXHJcblxyXG4uY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oJy9wb3N0cycsIHtcclxuICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9wb3N0cy9wb3N0cy5odG1sJyxcclxuICAgIGNvbnRyb2xsZXI6ICdwb3N0c0N0cmwnLFxyXG4gICAgY29udHJvbGxlckFzOiAncG9zdHMnXHJcbiAgfSk7XHJcbn1dKVxyXG5cclxuLmZhY3RvcnkoJ3Bvc3RzJywgWyckaHR0cCcsICdteUNvbmZpZycsIGZ1bmN0aW9uKCRodHRwLCBteUNvbmZpZyApIHtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1lc3NhZ2U6ICdlYXQgbWUgdG9kYXkhJyxcclxuXHJcbiAgICBwb3N0czogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHJldHVybiAkaHR0cC5nZXQobXlDb25maWcud29yZHByZXNzUG9zdHMpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcbn1dKVxyXG5cclxuLmNvbnRyb2xsZXIoJ3Bvc3RzQ3RybCcsIFsncG9zdHMnLCBmdW5jdGlvbihwb3N0cykge1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHBvc3RzLnBvc3RzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBzZWxmLnBvc3RzID0gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0sIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICB9KVxyXG5cclxuXHJcbn1dKTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG5hbmd1bGFyLm1vZHVsZSgnbXlBcHAuc3RhcndhcnNUZXh0JywgWyduZ1JvdXRlJ10pXHJcblxyXG4uY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICRyb3V0ZVByb3ZpZGVyLndoZW4oJy9zdGFyd2FycycsIHtcclxuICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9zdGFyd2Fycy10ZXh0LWFuaW0vc3RhcndhcnMuaHRtbCcsXHJcbiAgICBjb250cm9sbGVyOiAnc3RhcndhcnMnLFxyXG4gICAgY29udHJvbGxlckFzOiAnc3RhcndhcnNUZXh0J1xyXG4gIH0pO1xyXG59XSlcclxuXHJcbi5zZXJ2aWNlKCdieWxpbmVBbmltJywgZnVuY3Rpb24oKXsgXHJcblxyXG5cdC8qXHJcblx0XHRUaGUgZm9sbG93aW5nIEpTIHRha2VzIGluIHRoZSBieWxpbmUgYW5kIHNwbGl0cyBpdCBpbnRvIGxldHRlcnMsIGVhY2ggb25lIHdyYXBwZWQgaW4gYSBzcGFuLiBXZSBuZWVkIHRvIGNyZWF0ZSB0aGUgc3BhbnMgYXMgbm9kZXMsIHdlIGNhbid0IGp1c3QgYWRkIHRoZW0gdG8gdGhlIEhUTUwgdXNpbmcgaW5uZXJIVE1MLCBhcyB0byBkbyBzbyB3b3VsZCBtZWFuIHRoZSBDU1Mgd29uJ3QgYWZmZWN0IHRoZSBzcGFuIGJlY2F1c2UgaXQgZG9lc24ndCByZWNvZ25pc2UgdGhlIHRhZyBhcyBleGlzdGluZy4gSXQncyBhbiBvbGQgcHJvYmxlbSB3ZSBydW4gaW50byB0aW1lIGFuZCBhZ2Fpbi5cclxuXHQqL1xyXG5cclxuXHRcdHZhciBieWxpbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnlsaW5lJyk7ICBcdC8vIEZpbmQgdGhlIEgyXHJcblx0XHR2YXIgYnlsaW5lVGV4dCA9IGJ5bGluZS5pbm5lckhUTUw7XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBHZXQgdGhlIGNvbnRlbnQgb2YgdGhlIEgyXHJcblx0XHR2YXIgYnlsaW5lQXJyID0gYnlsaW5lVGV4dC5zcGxpdCgnJyk7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gU3BsaXQgY29udGVudCBpbnRvIGFycmF5XHJcblx0XHRieWxpbmUuaW5uZXJIVE1MID0gJyc7XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIEVtcHR5IGN1cnJlbnQgY29udGVudFxyXG5cclxuXHRcdHZhciBzcGFuO1x0XHRcdFx0XHQvLyBDcmVhdGUgdmFyaWFibGVzIHRvIGNyZWF0ZSBlbGVtZW50c1xyXG5cdFx0dmFyIGxldHRlcjtcclxuXHJcblx0XHRmb3IodmFyIGk9MDtpPGJ5bGluZUFyci5sZW5ndGg7aSsrKXtcdFx0XHRcdFx0XHRcdFx0XHQvLyBMb29wIGZvciBldmVyeSBsZXR0ZXJcclxuXHRcdCAgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1x0XHRcdFx0XHQvLyBDcmVhdGUgYSA8c3Bhbj4gZWxlbWVudFxyXG5cdFx0ICBsZXR0ZXIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShieWxpbmVBcnJbaV0pO1x0Ly8gQ3JlYXRlIHRoZSBsZXR0ZXJcclxuXHRcdCAgaWYoYnlsaW5lQXJyW2ldID09ICcgJykge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIElmIHRoZSBsZXR0ZXIgaXMgYSBzcGFjZS4uLlxyXG5cdFx0ICAgIGJ5bGluZS5hcHBlbmRDaGlsZChsZXR0ZXIpO1x0XHRcdFx0XHQvLyAuLi5BZGQgdGhlIHNwYWNlIHdpdGhvdXQgYSBzcGFuXHJcblx0XHQgIH0gZWxzZSB7XHJcblx0XHRcdFx0c3Bhbi5hcHBlbmRDaGlsZChsZXR0ZXIpO1x0XHRcdFx0XHRcdC8vIEFkZCB0aGUgbGV0dGVyIHRvIHRoZSBzcGFuXHJcblx0XHQgIFx0YnlsaW5lLmFwcGVuZENoaWxkKHNwYW4pOyBcdFx0XHRcdFx0Ly8gQWRkIHRoZSBzcGFuIHRvIHRoZSBoMlxyXG5cdFx0ICB9XHJcblx0XHR9XHJcblxyXG59KVxyXG5cclxuLmNvbnRyb2xsZXIoJ3N0YXJ3YXJzJywgWydieWxpbmVBbmltJywgJyRzY29wZScsICckbG9jYXRpb24nLCBmdW5jdGlvbihieWxpbmUsICRzY29wZSwgJGxvY2F0aW9uKSB7XHJcblx0Ly8gJHNjb3BlLnRlc3QgPSBmdW5jdGlvbigpIHsgJGxvY2F0aW9uLnBhdGgoJy90ZXJtaW5hbHRleHQnKTsgfVxyXG5cdC8vICRzY29wZS50ZXN0KCk7XHJcblx0JHNjb3BlLmJ5bGluZTtcclxuXHQkc2NvcGUuYW5pbWF0aW9uRW5kID0gZnVuY3Rpb24oKXtcclxuXHRcdGZ1bmN0aW9uIG15U2NyaXB0KCkgeyBcclxuXHRcdFx0Y29uc29sZS5sb2coJ2FuaW0gaXMgd29ya2luZyB3YWhvb28hJywgJGxvY2F0aW9uLnBhdGgoKSk7XHJcblx0XHRcdCRsb2NhdGlvbi5wYXRoKCcvdGVybWluYWx0ZXh0Jyk7XHJcblx0XHRcdCRzY29wZS4kYXBwbHkoKTtcclxuXHRcdH1cclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXJ0aW4nKS5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIG15U2NyaXB0KTtcclxuXHR9XHJcblxyXG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnRlcm1pbmFsdGV4dCcsIFsnbmdSb3V0ZScsICduZ1Nhbml0aXplJywgJ215QXBwLmNvbmZpZyddKVxyXG5cclxuLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlci53aGVuKCcvdGVybWluYWx0ZXh0Jywge1xyXG4gICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3Rlcm1pbmFsdGV4dC90ZXJtaW5hbHRleHQuaHRtbCcsXHJcbiAgICBjb250cm9sbGVyOiAnVGVybWluYWxUZXh0Q3RybCcsXHJcbiAgICBjb250cm9sbGVyQXM6ICd0ZXJtaW5hbHRleHQnXHJcbiAgfSk7XHJcbn1dKVxyXG5cclxuLmZhY3RvcnkoJ3ZpZXcxRmFjdCcsIFsnJGh0dHAnLCAnbXlDb25maWcnLCBmdW5jdGlvbigkaHR0cCwgbXlDb25maWcpIHtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5ld01lc3NhZ2U6ICdub29vbycsXHJcblxyXG4gICAgcGFnZXM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1BhZ2VzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XSlcclxuXHJcbi5mYWN0b3J5KCd0ZXJtaW5hbFRleHQnLCBbJyRxJywgJyRpbnRlcnZhbCcsICckdGltZW91dCcsICckcm9vdFNjb3BlJywgZnVuY3Rpb24oJHEsICRpbnRlcnZhbCwgJHRpbWVvdXQsICRyb290U2NvcGUpIHtcclxuIFxyXG4gIHZhciBkZWxheSA9IDIwMDA7XHJcbiAgdmFyIGl0ZXJhdG9yO1xyXG4gIHZhciBibGlua0xldHRlcnM7XHJcbiAgdmFyIGJsaW5rTGV0dGVyc0NsYXNzO1xyXG4gIHZhciB0ZXJtaW5hbFRleHQxO1xyXG4gIHZhciBhbmltYXRpb25UZXh0O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW5pbWF0ZXMgdGhlIGJsaW5rIHRleHRcclxuICAgICAqIEBwYXJhbSBjbGFzcyBjb250YWluaW5nIHRoZSB0ZXh0IHRvIGFuaW1hdGUuXHJcbiAgICAgKiAkc2NvcGUuJGVtaXRzIHRlcm1pbmFsVGV4dEZpbmlzaCBhZnRlciBmdW5jdGlvbiBmaW5pc2hlcy5cclxuICAgICAqL1xyXG4gIGZ1bmN0aW9uIHNldEJsaW5reSh0ZXh0KSB7IFxyXG5cclxuICAgIGJsaW5rTGV0dGVyc0NsYXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0ZXh0KTtcclxuICAgIGJsaW5rTGV0dGVycyA9IGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTDtcclxuICAgIGFuaW1hdGlvblRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0aW9uVGV4dCcpO1xyXG4gICAgYmxpbmtMZXR0ZXJzQ2xhc3MuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidGVybWluYWxUZXh0MVwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImJsaW5rXCI+JiN4N2M7PC9zcGFuPic7XHJcblxyXG4gICAgdmFyIGJsaW5rUGlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibGluaycpO1xyXG5cclxuICAgIHZhciBibGluayA9ICRpbnRlcnZhbCggZnVuY3Rpb24oKSB7IGlmIChibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9PSAwIHx8IGJsaW5rUGlwZS5zdHlsZS5vcGFjaXR5ID09ICcnICkgeyBibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9IDEgfSBlbHNlIHtibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9IDAgfX0sIDYwMCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbmltYXRlcyB0aHJvdWdoIHRoZSBzdHJpbmcuIFNldHMgdGhlIHNldFRpbWVvdXQgZnVuY3Rpb24uXHJcbiAgICAgKi9cclxuXHJcbiAgICAgZnVuY3Rpb24gYW5pbWF0ZUJsaW5rKCkge1xyXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBibGlua0xldHRlcnMubGVuZ3RoKzE7IGkrKykge1xyXG4gICAgICAgIGlmKCBpID09IGJsaW5rTGV0dGVycy5sZW5ndGggKyAxICkge1xyXG4gICAgICAgICAgZGVsYXkgPSBkZWxheSArIDEwMDA7XHJcbiAgICAgICAgICBzZXRDYWxsQmFja1RpbWVPdXQoZGVsYXkpOyBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgKyA1MDA7XHJcbiAgICAgICAgc2V0VGhlVGltZW91dChpLGRlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXRzIGNhbGxiYWNrIHRvIGFuaW1hdGVCbGluayBmdW5jdGlvblxyXG4gICAgICovXHJcbiAgICAgZnVuY3Rpb24gc2V0Q2FsbEJhY2tUaW1lT3V0KGRlbGF5KSB7XHJcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRlcm1pbmFsVGV4dDEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVybWluYWxUZXh0MScpO1xyXG4gICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUudG9wID0gJzUwJSc7XHJcbiAgICAgICAgYW5pbWF0aW9uVGV4dC5zdHlsZS5sZWZ0ID0gJzUwJSc7XHJcbiAgICAgICAgdGVybWluYWxUZXh0MS5jbGFzc05hbWUgKz0gJyBjZW50ZXJUZXh0QWZ0ZXJBbmltJztcclxuICAgICAgICBibGlua1BpcGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChibGlua1BpcGUpO1xyXG4gICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgndGVybWluYWxUZXh0RmluaXNoJyk7XHJcbiAgICAgIH0sIGRlbGF5KTtcclxuICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJdGVyYXRvcnMgdGhlIHNldFRpbWVvdXQgZm9yIGFuaW1hdGlvbi5cclxuICAgICAqL1xyXG4gICAgIGZ1bmN0aW9uIHNldFRoZVRpbWVvdXQoaXRlcmF0b3IsIGRlbGF5KSB7XHJcbiAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlcm1pbmFsVGV4dDEnKS5pbm5lckhUTUwgPSBibGlua0xldHRlcnMuc3Vic3RyKDAsIGl0ZXJhdG9yKTtcclxuICAgICAgICB9LCBkZWxheSk7XHJcbiAgICAgfVxyXG5cclxuICAgICBhbmltYXRlQmxpbmsoKTtcclxuXHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdGVybWluYWw6IGZ1bmN0aW9uKHRleHQpIHtcclxuICAgICAgc2V0Qmxpbmt5KHRleHQpXHJcbiAgICB9XHJcblxyXG4gIH1cclxufV0pXHJcblxyXG4uY29udHJvbGxlcignVGVybWluYWxUZXh0Q3RybCcsIFsndmlldzFGYWN0JywgJ3Rlcm1pbmFsVGV4dCcsICckc2NvcGUnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbih2aWV3MUZhY3QsIHRlcm1pbmFsVGV4dCwgJHNjb3BlLCAkdGltZW91dCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy50ZXJtaW5hbFRleHQgPSB0ZXJtaW5hbFRleHQudGVybWluYWwoJy50ZXJtaW5hbCcpO1xyXG4gICAgdmlldzFGYWN0LnBhZ2VzKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICBzZWxmLmhvbWVwYWdlID0gcmVzcG9uc2UuZGF0YTtcclxuICAgIH0sIGZ1bmN0aW9uKHJlYXNvbikge1xyXG4gICAgICBjb25zb2xlLmxvZygndmlldzFGYWN0IGNvbnRyb2xsZXIgbm90IHdvcmtpbmcgJywgcmVhc29uKTtcclxuICAgIH0pO1xyXG4gICAgJHNjb3BlLiRvbigndGVybWluYWxUZXh0RmluaXNoJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdicm9hZGNhc3QgaGFzIHdvcmtlZCcpO1xyXG4gICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJHNjb3BlLnNldEhvbWVCdG4gPSB0cnVlO1xyXG4gICAgICB9LCAyMDAwKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5wZWVrQnRuQ2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnR1YmVzdGF0dXNlcycsIFsnbmdSb3V0ZSddKVxyXG5cclxuICAuY29uZmlnKFsnJHJvdXRlUHJvdmlkZXInLCBmdW5jdGlvbigkcm91dGVQcm92aWRlcikge1xyXG4gICAgICAkcm91dGVQcm92aWRlclxyXG4gICAgICAgIC53aGVuKCcvdHViZXN0YXR1c2VzJywge1xyXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3R1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuaHRtbCcsXHJcbiAgICAgICAgICBjb250cm9sbGVyOiAndHViZXN0YXR1c2VzQ3RybCcsXHJcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICd0dWJlc3RhdHVzZXNUZmwnXHJcbiAgICAgICAgfSlcclxuICB9XSlcclxuXHJcbiAgLmZhY3RvcnkoJ3R1YmVzdGF0dXNlc1RmbCcsIFsnJGh0dHAnLCBmdW5jdGlvbigkaHR0cCkge1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG1lc3NhZ2U6ICdzb21lYm9keSBzdG9wIG1lIScsXHJcblxyXG4gICAgICB0ZmwgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2xpbmUvbW9kZS90dWJlL3N0YXR1cycsIHtcclxuICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICBhcGlfaWQ6ICcxYTNmZmJkMicsXHJcbiAgICAgICAgICAgIGFwaV9rZXk6ICcyYWRmYjAyMDAxYWRmZWZhMDY4ZjdhNzQ4NjI4NTRlNidcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1dKVxyXG5cclxuICAuY29udHJvbGxlcigndHViZXN0YXR1c2VzQ3RybCcsIFsndHViZXN0YXR1c2VzVGZsJywgZnVuY3Rpb24odHViZXN0YXR1c2VzVGZsKSB7XHJcblxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5tZXNzYWdlID0gJ2hlbGxvbyBtb25rZXknO1xyXG4gICAgdGhpcy52aWV3TXNnID0gdHViZXN0YXR1c2VzVGZsLm1lc3NhZ2U7XHJcblxyXG4gICAgICB0dWJlc3RhdHVzZXNUZmwudGZsKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG4gICAgICAgIHNlbGYudGZsID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfV0pO1xyXG5cclxuXHJcblxyXG4vLyAgLmNvbnRyb2xsZXIoJ3R1YmVzdGF0dXNlc0N0cmwnLCB0dWJlc3RhdHVzZXNDdHJsKVxyXG4vL1xyXG4vLyAgLmZhY3RvcnkoJ3RmbCcsIHRmbCk7XHJcbi8vXHJcbi8vZnVuY3Rpb24gdHViZXN0YXR1c2VzQ3RybCgpIHt9XHJcbi8vXHJcbi8vZnVuY3Rpb24gdGZsKCkge31cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
