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
    .success(function(data) {
      deferred.resolve(data);
    })
    .error(function() {
      deferred.reject();
    });

    return deferred.promise; 
  };

  return service; 
  }
})();