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

describe('myApp.posts module', function() {

  beforeEach(module('myApp.posts'));

  describe('posts controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});
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

fdescribe('myApp.terminaltext module', function() {

  beforeEach(module('myApp.terminaltext'));
  beforeEach(module('myApp.config'));

  var httpBackend,
    scope,
    jsonResponse = { title: 'first page'},
    jsonResponse1 = { title: 'second page'},
    myConfig;

  beforeEach(inject(function ($rootScope, $controller, $httpBackend, $http, _myConfig_) {
    scope = $rootScope.$new();
    myConfig = _myConfig_;
    httpBackend = $httpBackend;
    //$httpBackend.whenGET(myConfig.wordpressPages).respond(jsonResponse);
    $httpBackend.whenGET(/(wp-json\/wp\/v2\/posts$)/).respond(jsonResponse);
    $controller('TerminaltextCtrl as terminaltext', {
      $scope: scope,
      $http: $http
    });
  }));

  it('myConfig constant myconfig.wordpressPages', function() {
    expect(myConfig.wordpressPages).toBeDefined();
  });

  it('myConfig constant myconfig.wordpressPosts', function() {
    expect(myConfig.wordpressPosts).toBeDefined();
  });

  it('mock httpbackend test terminaltext homepage promise', inject(function($httpBackend) {
    $httpBackend.whenGET(myConfig.wordpressPages).respond(jsonResponse);
    httpBackend.flush();
    expect(scope.view1.homepage).toEqual(jasmine.objectContaining({ title: 'first page' }));
  }));

  it('using regex for httpbackend', inject(function($httpBackend) {
    $httpBackend.whenGET(/(wp-json\/wp\/v2\/pages$)/).respond(jsonResponse1);
    httpBackend.flush();
    expect(scope.view1.homepage).toEqual(jasmine.objectContaining({ title: 'second page' }));
  }));

});
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
