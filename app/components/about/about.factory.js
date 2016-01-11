(function() {
  'use strict';

  angular.module('myApp.about')

  .factory('pages', pages);
  pages.$inject = ['$q', '$http', 'myConfig'];

  function pages($q, $http, myConfig) {

  var service = {};

  service.getPages = function getPages() {
    var deferred = $q.defer();
    
    $http.get(myConfig.wordpressPages)
    .then(function(data) {
      deferred.resolve(data);
    },
    function(error) {
      deferred.reject(error);
    });

    return deferred.promise; 
  };

  return service; 
  }
})();