angular.module('myApp.config', [])
.constant('myConfig', {
	//'wordpressPages': '/wordpress-angular/wordpress/wp-json/wp/v2/pages',
	//'wordpressPosts': '/wordpress-angular/wordpress/wp-json/wp/v2/posts'
	 'wordpressPages': 'http://localhost:8888/angular/angular-wordpress/1/wordpress/wp-json/wp/v2/pages',
	 'wordpressPosts': 'http://localhost:8888/angular/angular-wordpress/1/wordpress/wp-json/wp/v2/posts'
});