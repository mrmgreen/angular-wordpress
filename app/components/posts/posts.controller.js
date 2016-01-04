(function() {
	'use strict',

	angular.module('myApp.posts')
	.controller('postsCtrl', postsCtrl);

  postsCtrl.$inject = ['posts'];
  
  function postsCtrl(posts){
    this.howdy = 'hello mr Bond';
    var self = this;
    posts.posts().then(function(response) {
      self.posts = response.data;
    }, function(data) {
      console.log(data);
    });
  }
})();