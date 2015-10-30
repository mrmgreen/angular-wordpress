'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'postsCtrl',
    controllerAs: 'posts'
  });
}])

.factory('posts', ['$http', function($http) {

  return {
    message: 'eat me today!',

    posts: function() {
      return $http.get('http://localhost:8888/angular/angular-wordpress/1/wordpress/wp-json/wp/v2/posts');
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