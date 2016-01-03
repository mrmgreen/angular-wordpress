(function() {
  'use strict';

  angular.module('myApp.posts')

  .factory('posts', posts);
  posts.$inject = ['$http', 'myConfig'];

  function posts($http, myConfig) {

    return {

      posts: function() {
        return $http.get(myConfig.wordpressPosts);
      }

    }
  }

})();