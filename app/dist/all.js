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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3RzL3Bvc3RzLmpzIiwic3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmpzIiwidGVybWluYWx0ZXh0L3Rlcm1pbmFsdGV4dC5qcyIsInR1YmVzdGF0dXNlcy90dWJlc3RhdHVzZXMuanMiLCJqb3VybmV5cGxhbm5lci9qb3VybmV5cGxhbm5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnBvc3RzJywgWyduZ1JvdXRlJywgJ215QXBwLmNvbmZpZyddKVxyXG5cclxuLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlci53aGVuKCcvcG9zdHMnLCB7XHJcbiAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvcG9zdHMvcG9zdHMuaHRtbCcsXHJcbiAgICBjb250cm9sbGVyOiAncG9zdHNDdHJsJyxcclxuICAgIGNvbnRyb2xsZXJBczogJ3Bvc3RzJ1xyXG4gIH0pO1xyXG59XSlcclxuXHJcbi5mYWN0b3J5KCdwb3N0cycsIFsnJGh0dHAnLCAnbXlDb25maWcnLCBmdW5jdGlvbigkaHR0cCwgbXlDb25maWcgKSB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtZXNzYWdlOiAnZWF0IG1lIHRvZGF5IScsXHJcblxyXG4gICAgcG9zdHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICByZXR1cm4gJGh0dHAuZ2V0KG15Q29uZmlnLndvcmRwcmVzc1Bvc3RzKTtcclxuICAgIH1cclxuXHJcbiAgfVxyXG59XSlcclxuXHJcbi5jb250cm9sbGVyKCdwb3N0c0N0cmwnLCBbJ3Bvc3RzJywgZnVuY3Rpb24ocG9zdHMpIHtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBwb3N0cy5wb3N0cygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgc2VsZi5wb3N0cyA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9LCBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgfSlcclxuXHJcblxyXG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxuYW5ndWxhci5tb2R1bGUoJ215QXBwLnN0YXJ3YXJzVGV4dCcsIFsnbmdSb3V0ZSddKVxyXG5cclxuLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlci53aGVuKCcvc3RhcndhcnMnLCB7XHJcbiAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvc3RhcndhcnMtdGV4dC1hbmltL3N0YXJ3YXJzLmh0bWwnLFxyXG4gICAgY29udHJvbGxlcjogJ3N0YXJ3YXJzJyxcclxuICAgIGNvbnRyb2xsZXJBczogJ3N0YXJ3YXJzVGV4dCdcclxuICB9KTtcclxufV0pXHJcblxyXG4uc2VydmljZSgnYnlsaW5lQW5pbScsIGZ1bmN0aW9uKCl7IFxyXG5cclxuXHQvKlxyXG5cdFx0VGhlIGZvbGxvd2luZyBKUyB0YWtlcyBpbiB0aGUgYnlsaW5lIGFuZCBzcGxpdHMgaXQgaW50byBsZXR0ZXJzLCBlYWNoIG9uZSB3cmFwcGVkIGluIGEgc3Bhbi4gV2UgbmVlZCB0byBjcmVhdGUgdGhlIHNwYW5zIGFzIG5vZGVzLCB3ZSBjYW4ndCBqdXN0IGFkZCB0aGVtIHRvIHRoZSBIVE1MIHVzaW5nIGlubmVySFRNTCwgYXMgdG8gZG8gc28gd291bGQgbWVhbiB0aGUgQ1NTIHdvbid0IGFmZmVjdCB0aGUgc3BhbiBiZWNhdXNlIGl0IGRvZXNuJ3QgcmVjb2duaXNlIHRoZSB0YWcgYXMgZXhpc3RpbmcuIEl0J3MgYW4gb2xkIHByb2JsZW0gd2UgcnVuIGludG8gdGltZSBhbmQgYWdhaW4uXHJcblx0Ki9cclxuXHJcblx0XHR2YXIgYnlsaW5lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J5bGluZScpOyAgXHQvLyBGaW5kIHRoZSBIMlxyXG5cdFx0dmFyIGJ5bGluZVRleHQgPSBieWxpbmUuaW5uZXJIVE1MO1x0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gR2V0IHRoZSBjb250ZW50IG9mIHRoZSBIMlxyXG5cdFx0dmFyIGJ5bGluZUFyciA9IGJ5bGluZVRleHQuc3BsaXQoJycpO1x0XHRcdFx0XHRcdFx0XHRcdC8vIFNwbGl0IGNvbnRlbnQgaW50byBhcnJheVxyXG5cdFx0YnlsaW5lLmlubmVySFRNTCA9ICcnO1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBFbXB0eSBjdXJyZW50IGNvbnRlbnRcclxuXHJcblx0XHR2YXIgc3BhbjtcdFx0XHRcdFx0Ly8gQ3JlYXRlIHZhcmlhYmxlcyB0byBjcmVhdGUgZWxlbWVudHNcclxuXHRcdHZhciBsZXR0ZXI7XHJcblxyXG5cdFx0Zm9yKHZhciBpPTA7aTxieWxpbmVBcnIubGVuZ3RoO2krKyl7XHRcdFx0XHRcdFx0XHRcdFx0Ly8gTG9vcCBmb3IgZXZlcnkgbGV0dGVyXHJcblx0XHQgIHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcdFx0XHRcdFx0Ly8gQ3JlYXRlIGEgPHNwYW4+IGVsZW1lbnRcclxuXHRcdCAgbGV0dGVyID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYnlsaW5lQXJyW2ldKTtcdC8vIENyZWF0ZSB0aGUgbGV0dGVyXHJcblx0XHQgIGlmKGJ5bGluZUFycltpXSA9PSAnICcpIHtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyBJZiB0aGUgbGV0dGVyIGlzIGEgc3BhY2UuLi5cclxuXHRcdCAgICBieWxpbmUuYXBwZW5kQ2hpbGQobGV0dGVyKTtcdFx0XHRcdFx0Ly8gLi4uQWRkIHRoZSBzcGFjZSB3aXRob3V0IGEgc3BhblxyXG5cdFx0ICB9IGVsc2Uge1xyXG5cdFx0XHRcdHNwYW4uYXBwZW5kQ2hpbGQobGV0dGVyKTtcdFx0XHRcdFx0XHQvLyBBZGQgdGhlIGxldHRlciB0byB0aGUgc3BhblxyXG5cdFx0ICBcdGJ5bGluZS5hcHBlbmRDaGlsZChzcGFuKTsgXHRcdFx0XHRcdC8vIEFkZCB0aGUgc3BhbiB0byB0aGUgaDJcclxuXHRcdCAgfVxyXG5cdFx0fVxyXG5cclxufSlcclxuXHJcbi5jb250cm9sbGVyKCdzdGFyd2FycycsIFsnYnlsaW5lQW5pbScsICckc2NvcGUnLCAnJGxvY2F0aW9uJywgZnVuY3Rpb24oYnlsaW5lLCAkc2NvcGUsICRsb2NhdGlvbikge1xyXG5cdC8vICRzY29wZS50ZXN0ID0gZnVuY3Rpb24oKSB7ICRsb2NhdGlvbi5wYXRoKCcvdGVybWluYWx0ZXh0Jyk7IH1cclxuXHQvLyAkc2NvcGUudGVzdCgpO1xyXG5cdCRzY29wZS5ieWxpbmU7XHJcblx0JHNjb3BlLmFuaW1hdGlvbkVuZCA9IGZ1bmN0aW9uKCl7XHJcblx0XHRmdW5jdGlvbiBteVNjcmlwdCgpIHsgXHJcblx0XHRcdGNvbnNvbGUubG9nKCdhbmltIGlzIHdvcmtpbmcgd2Fob29vIScsICRsb2NhdGlvbi5wYXRoKCkpO1xyXG5cdFx0XHQkbG9jYXRpb24ucGF0aCgnL3Rlcm1pbmFsdGV4dCcpO1xyXG5cdFx0XHQkc2NvcGUuJGFwcGx5KCk7XHJcblx0XHR9XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFydGluJykuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLCBteVNjcmlwdCk7XHJcblx0fVxyXG5cclxufV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC50ZXJtaW5hbHRleHQnLCBbJ25nUm91dGUnLCAnbmdTYW5pdGl6ZScsICdteUFwcC5jb25maWcnXSlcclxuXHJcbi5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgJHJvdXRlUHJvdmlkZXIud2hlbignL3Rlcm1pbmFsdGV4dCcsIHtcclxuICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90ZXJtaW5hbHRleHQvdGVybWluYWx0ZXh0Lmh0bWwnLFxyXG4gICAgY29udHJvbGxlcjogJ1Rlcm1pbmFsVGV4dEN0cmwnLFxyXG4gICAgY29udHJvbGxlckFzOiAndGVybWluYWx0ZXh0J1xyXG4gIH0pO1xyXG59XSlcclxuXHJcbi5mYWN0b3J5KCd2aWV3MUZhY3QnLCBbJyRodHRwJywgJ215Q29uZmlnJywgZnVuY3Rpb24oJGh0dHAsIG15Q29uZmlnKSB7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBuZXdNZXNzYWdlOiAnbm9vb28nLFxyXG5cclxuICAgIHBhZ2VzOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuICRodHRwLmdldChteUNvbmZpZy53b3JkcHJlc3NQYWdlcyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxufV0pXHJcblxyXG4uZmFjdG9yeSgndGVybWluYWxUZXh0JywgWyckcScsICckaW50ZXJ2YWwnLCAnJHRpbWVvdXQnLCAnJHJvb3RTY29wZScsIGZ1bmN0aW9uKCRxLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkcm9vdFNjb3BlKSB7XHJcbiBcclxuICB2YXIgZGVsYXkgPSAyMDAwO1xyXG4gIHZhciBpdGVyYXRvcjtcclxuICB2YXIgYmxpbmtMZXR0ZXJzO1xyXG4gIHZhciBibGlua0xldHRlcnNDbGFzcztcclxuICB2YXIgdGVybWluYWxUZXh0MTtcclxuICB2YXIgYW5pbWF0aW9uVGV4dDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuaW1hdGVzIHRoZSBibGluayB0ZXh0XHJcbiAgICAgKiBAcGFyYW0gY2xhc3MgY29udGFpbmluZyB0aGUgdGV4dCB0byBhbmltYXRlLlxyXG4gICAgICogJHNjb3BlLiRlbWl0cyB0ZXJtaW5hbFRleHRGaW5pc2ggYWZ0ZXIgZnVuY3Rpb24gZmluaXNoZXMuXHJcbiAgICAgKi9cclxuICBmdW5jdGlvbiBzZXRCbGlua3kodGV4dCkgeyBcclxuXHJcbiAgICBibGlua0xldHRlcnNDbGFzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGV4dCk7XHJcbiAgICBibGlua0xldHRlcnMgPSBibGlua0xldHRlcnNDbGFzcy5pbm5lckhUTUw7XHJcbiAgICBhbmltYXRpb25UZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hdGlvblRleHQnKTtcclxuICAgIGJsaW5rTGV0dGVyc0NsYXNzLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInRlcm1pbmFsVGV4dDFcIj48L3NwYW4+PHNwYW4gY2xhc3M9XCJibGlua1wiPiYjeDdjOzwvc3Bhbj4nO1xyXG5cclxuICAgIHZhciBibGlua1BpcGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmxpbmsnKTtcclxuXHJcbiAgICB2YXIgYmxpbmsgPSAkaW50ZXJ2YWwoIGZ1bmN0aW9uKCkgeyBpZiAoYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPT0gMCB8fCBibGlua1BpcGUuc3R5bGUub3BhY2l0eSA9PSAnJyApIHsgYmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPSAxIH0gZWxzZSB7YmxpbmtQaXBlLnN0eWxlLm9wYWNpdHkgPSAwIH19LCA2MDApO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW5pbWF0ZXMgdGhyb3VnaCB0aGUgc3RyaW5nLiBTZXRzIHRoZSBzZXRUaW1lb3V0IGZ1bmN0aW9uLlxyXG4gICAgICovXHJcblxyXG4gICAgIGZ1bmN0aW9uIGFuaW1hdGVCbGluaygpIHtcclxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gYmxpbmtMZXR0ZXJzLmxlbmd0aCsxOyBpKyspIHtcclxuICAgICAgICBpZiggaSA9PSBibGlua0xldHRlcnMubGVuZ3RoICsgMSApIHtcclxuICAgICAgICAgIGRlbGF5ID0gZGVsYXkgKyAxMDAwO1xyXG4gICAgICAgICAgc2V0Q2FsbEJhY2tUaW1lT3V0KGRlbGF5KTsgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkZWxheSA9IGRlbGF5ICsgNTAwO1xyXG4gICAgICAgIHNldFRoZVRpbWVvdXQoaSxkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2V0cyBjYWxsYmFjayB0byBhbmltYXRlQmxpbmsgZnVuY3Rpb25cclxuICAgICAqL1xyXG4gICAgIGZ1bmN0aW9uIHNldENhbGxCYWNrVGltZU91dChkZWxheSkge1xyXG4gICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICB0ZXJtaW5hbFRleHQxID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlcm1pbmFsVGV4dDEnKTtcclxuICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICBhbmltYXRpb25UZXh0LnN0eWxlLnRvcCA9ICc1MCUnO1xyXG4gICAgICAgIGFuaW1hdGlvblRleHQuc3R5bGUubGVmdCA9ICc1MCUnO1xyXG4gICAgICAgIHRlcm1pbmFsVGV4dDEuY2xhc3NOYW1lICs9ICcgY2VudGVyVGV4dEFmdGVyQW5pbSc7XHJcbiAgICAgICAgYmxpbmtQaXBlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmxpbmtQaXBlKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ3Rlcm1pbmFsVGV4dEZpbmlzaCcpO1xyXG4gICAgICB9LCBkZWxheSk7XHJcbiAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSXRlcmF0b3JzIHRoZSBzZXRUaW1lb3V0IGZvciBhbmltYXRpb24uXHJcbiAgICAgKi9cclxuICAgICBmdW5jdGlvbiBzZXRUaGVUaW1lb3V0KGl0ZXJhdG9yLCBkZWxheSkge1xyXG4gICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZXJtaW5hbFRleHQxJykuaW5uZXJIVE1MID0gYmxpbmtMZXR0ZXJzLnN1YnN0cigwLCBpdGVyYXRvcik7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgIH1cclxuXHJcbiAgICAgYW5pbWF0ZUJsaW5rKCk7XHJcblxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRlcm1pbmFsOiBmdW5jdGlvbih0ZXh0KSB7XHJcbiAgICAgIHNldEJsaW5reSh0ZXh0KVxyXG4gICAgfVxyXG5cclxuICB9XHJcbn1dKVxyXG5cclxuLmNvbnRyb2xsZXIoJ1Rlcm1pbmFsVGV4dEN0cmwnLCBbJ3ZpZXcxRmFjdCcsICd0ZXJtaW5hbFRleHQnLCAnJHNjb3BlJywgJyR0aW1lb3V0JywgZnVuY3Rpb24odmlldzFGYWN0LCB0ZXJtaW5hbFRleHQsICRzY29wZSwgJHRpbWVvdXQpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMudGVybWluYWxUZXh0ID0gdGVybWluYWxUZXh0LnRlcm1pbmFsKCcudGVybWluYWwnKTtcclxuICAgIHZpZXcxRmFjdC5wYWdlcygpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgc2VsZi5ob21lcGFnZSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcclxuICAgICAgY29uc29sZS5sb2coJ3ZpZXcxRmFjdCBjb250cm9sbGVyIG5vdCB3b3JraW5nICcsIHJlYXNvbik7XHJcbiAgICB9KTtcclxuICAgICRzY29wZS4kb24oJ3Rlcm1pbmFsVGV4dEZpbmlzaCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnYnJvYWRjYXN0IGhhcyB3b3JrZWQnKTtcclxuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICRzY29wZS5zZXRIb21lQnRuID0gdHJ1ZTtcclxuICAgICAgfSwgMjAwMCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMucGVla0J0bkNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxufV0pOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdteUFwcC50dWJlc3RhdHVzZXMnLCBbJ25nUm91dGUnXSlcclxuXHJcbiAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgJHJvdXRlUHJvdmlkZXJcclxuICAgICAgICAud2hlbignL3R1YmVzdGF0dXNlcycsIHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy90dWJlc3RhdHVzZXMvdHViZXN0YXR1c2VzLmh0bWwnLFxyXG4gICAgICAgICAgY29udHJvbGxlcjogJ3R1YmVzdGF0dXNlc0N0cmwnLFxyXG4gICAgICAgICAgY29udHJvbGxlckFzOiAndHViZXN0YXR1c2VzVGZsJ1xyXG4gICAgICAgIH0pXHJcbiAgfV0pXHJcblxyXG4gIC5mYWN0b3J5KCd0dWJlc3RhdHVzZXNUZmwnLCBbJyRodHRwJywgZnVuY3Rpb24oJGh0dHApIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBtZXNzYWdlOiAnc29tZWJvZHkgc3RvcCBtZSEnLFxyXG5cclxuICAgICAgdGZsIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9hcGkudGZsLmdvdi51ay9saW5lL21vZGUvdHViZS9zdGF0dXMnLCB7XHJcbiAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgYXBpX2lkOiAnMWEzZmZiZDInLFxyXG4gICAgICAgICAgICBhcGlfa2V5OiAnMmFkZmIwMjAwMWFkZmVmYTA2OGY3YTc0ODYyODU0ZTYnXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XSlcclxuXHJcbiAgLmNvbnRyb2xsZXIoJ3R1YmVzdGF0dXNlc0N0cmwnLCBbJ3R1YmVzdGF0dXNlc1RmbCcsIGZ1bmN0aW9uKHR1YmVzdGF0dXNlc1RmbCkge1xyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMubWVzc2FnZSA9ICdoZWxsb28gbW9ua2V5JztcclxuICAgIHRoaXMudmlld01zZyA9IHR1YmVzdGF0dXNlc1RmbC5tZXNzYWdlO1xyXG5cclxuICAgICAgdHViZXN0YXR1c2VzVGZsLnRmbCgpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLnRmbCA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH1dKTtcclxuXHJcblxyXG5cclxuLy8gIC5jb250cm9sbGVyKCd0dWJlc3RhdHVzZXNDdHJsJywgdHViZXN0YXR1c2VzQ3RybClcclxuLy9cclxuLy8gIC5mYWN0b3J5KCd0ZmwnLCB0ZmwpO1xyXG4vL1xyXG4vL2Z1bmN0aW9uIHR1YmVzdGF0dXNlc0N0cmwoKSB7fVxyXG4vL1xyXG4vL2Z1bmN0aW9uIHRmbCgpIHt9XHJcbiIsImFuZ3VsYXIubW9kdWxlKCdteUFwcC5qb3VybmV5cGxhbm5lcicsIFsnbmdSb3V0ZSddKVxyXG5cclxuLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAkcm91dGVQcm92aWRlclxyXG4gICAgLndoZW4oJy9qb3VybmV5cGxhbm5lcicsIHtcclxuICAgICAgY29udHJvbGxlcjogJ2pvdXJuZXlQbGFubmVyJyxcclxuICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL2pvdXJuZXlwbGFubmVyL2pvdXJuZXlwbGFubmVyLmh0bWwnLFxyXG4gICAgICBjb250cm9sbGVyQXM6ICdqb3VybmV5cGxhbm5lcidcclxuICAgIH0pXHJcbn1dKVxyXG5cclxuLmNvbnRyb2xsZXIoJ2pvdXJuZXlQbGFubmVyJyxbJ2pvdXJuZXlQbGFubmVyRmFjdCcsICckc2NvcGUnLCAnJGxvZycsICckaHR0cCcsIGZ1bmN0aW9uKGpvdXJuZXlQbGFubmVyRmFjdCwgJHNjb3BlLCAkbG9nLCAkaHR0cCkge1xyXG4gXHJcbi8qIHR5cGVhaGVhZCAqL1xyXG4vKiByZXR1cm5zIGxvY2F0aW9uIGZyb20gcXVlcnkgaW5wdXQgKi9cclxuICAkc2NvcGUuZ2V0TG9jYXRpb24gPSBmdW5jdGlvbih2YWwpIHtcclxuICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vYXBpLnRmbC5nb3YudWsvU3RvcFBvaW50L3NlYXJjaCcsIHtcclxuICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgcXVlcnk6IHZhbCxcclxuICAgICAgICBtb2RlczogJ3R1YmUnXHJcbiAgICAgIH1cclxuICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YS5tYXRjaGVzLm1hcChmdW5jdGlvbihpdGVtKXtcclxuICAgICAgICBjb25zb2xlLmxvZygndGhlcmUgYXN5bmMnLCBpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIC8vdHlwZWFoZWFkIGVuZFxyXG5cclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMuZGVzdGluYXRpb25zO1xyXG4gICAgdGhpcy5wcm9taXNlSm91cm5leSA9ICcnO1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdkZXN0aW5hdGlvbnMnLCB0aGlzLmRlc3RpbmF0aW9ucyk7XHJcbiAgICAgIGpvdXJuZXlQbGFubmVyRmFjdC5wcm9taXNlSm91cm5leUZlZWQodGhpcy5kZXN0aW5hdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBzZWxmLnByb21pc2VKb3VybmV5ID0gcmVzcG9uc2UuZGF0YTtcclxuICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3Igd2l0aCBqb3VybmV5JywgcmVwb25zZS5kYXRhKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAvKiBkaXJlY3RpdmUgY3VzdG9tZXIgbmFtZSAqL1xyXG4gICAgdGhpcy5jdXN0b21lciA9IHtcclxuICAgICAgbmFtZTogJ0RlcmVrJ1xyXG4gICAgfVxyXG59XSlcclxuXHJcbi5kaXJlY3RpdmUoJ215Q3VzdG9tZXInLCBmdW5jdGlvbigpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdGVtcGxhdGU6ICdOYW1lIHt7ICBqb3VybmV5cGxhbm5lci5jdXN0b21lci5uYW1lIH19J1xyXG4gIH07XHJcbn0pXHJcblxyXG4uZmFjdG9yeSgnam91cm5leVBsYW5uZXJGYWN0JywgWyckaHR0cCcsIGZ1bmN0aW9uKCRodHRwKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgcHJvbWlzZUpvdXJuZXlGZWVkOiBmdW5jdGlvbihkZXN0aW5hdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL2FwaS50ZmwuZ292LnVrL2pvdXJuZXkvam91cm5leXJlc3VsdHMvJyArIGRlc3RpbmF0aW9ucy5mcm9tLmljc0lkICsgJy90by8nICsgZGVzdGluYXRpb25zLnRvLmljc0lkKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG59XSk7XHJcblxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
