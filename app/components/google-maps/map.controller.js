(function() {
'use strict',

angular.module('myApp.map')

	.controller('maps', maps);

	function maps() {

	console.log('boom');
	appendGoogleMapsAPI();

	function appendGoogleMapsAPI() {
		var googleApi = document.createElement('script');
		googleApi.src = 'http://maps.googleapis.com/maps/api/js';
		googleApi.addEventListener('load', initialize);
		document.querySelector('head').appendChild(googleApi);
	}

	function initialize() {
		console.log('initialize');
	  var mapProp = {
	    center:new google.maps.LatLng(51.508742,-0.120850),
	    zoom:5,
	    mapTypeId:google.maps.MapTypeId.ROADMAP
	  };
	  var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	}



		// initMap();

		// function initMap() {
		//   // Create a map object and specify the DOM element for display.
		//   var map = new google.maps.Map(document.getElementById('map'), {
		//     center: {lat: -34.397, lng: 150.644},
		//     scrollwheel: false,
		//     zoom: 8
		//   });
		// }
	}

})();