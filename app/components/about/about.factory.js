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