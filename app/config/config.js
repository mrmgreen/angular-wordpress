angular.module('myApp.config', [])
.constant('myConfig', {
	// 'wordpressPages': '/wp-json/wp/v2/pages', // ---Prod---
	// 'wordpressPosts': '/wp-json/wp/v2/posts'
	'wordpressPages': '/wordpress-angular/wordpress/wp-json/wp/v2/pages', // ---home---
	'wordpressPosts': '/wordpress-angular/wordpress/wp-json/wp/v2/posts'
	 // 'wordpressPages': 'http://localhost:8888/angular/angular-wordpress/1/wordpress/wp-json/wp/v2/pages', //--work--
	 // 'wordpressPosts': 'http://localhost:8888/angular/angular-wordpress/1/wordpress/wp-json/wp/v2/posts'
});