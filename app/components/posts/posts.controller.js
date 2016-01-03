(function() {
	'use strict',

	angular.module('myApp.posts')
	.controller('postsCtrl', postsCtrl);

  function postsCtrl(posts){
    this.howdy = 'message me could yal';
    var self = this;
    posts.posts().then(function(response) {
      self.posts = response.data;
    }, function(data) {
      console.log(data);
    });
  }
})();