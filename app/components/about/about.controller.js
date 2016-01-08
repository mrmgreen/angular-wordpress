(function() {
	'use strict',

	angular.module('myApp.about')

	.controller('aboutCtrl', aboutCtrl)

	aboutCtrl.$inject = ['pages'];

	function aboutCtrl(pages) {
		var self = this;
		pages.getPages().then(function(response) {
			self.pages = response.data;
		}, function(data) {
			console.log('pages api failed ', data);
			self.error = 'getPages has thrown an error';
		});
		this.message = "all is good";
	}

})();