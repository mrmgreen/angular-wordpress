(function() {
  'use strict';

  angular.module('myApp.terminaltext')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/terminaltext', {
      templateUrl: 'components/terminaltext/terminaltext.html',
      controller: 'TerminalTextCtrl',
      controllerAs: 'vm'
    });
  }]);
  
})();