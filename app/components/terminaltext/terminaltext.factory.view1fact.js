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