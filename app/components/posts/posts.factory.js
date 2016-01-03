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