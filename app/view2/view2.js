'use strict';

angular.module('myApp.view2', ['ngRoute', 'myApp.config'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
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