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