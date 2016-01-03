(function() {
  'use strict';

  angular.module('myApp.terminaltext')

  .controller('TerminalTextCtrl', ['view1Fact', 'terminalText', '$scope', '$timeout', function(view1Fact, terminalText, $scope, $timeout) {
      var self = this;
      this.terminalText = terminalText.terminal('.terminal');
      view1Fact.pages().then(function(response) {
        self.homepage = response.data;
      }, function(reason) {
        console.log('view1Fact controller not working ', reason);
      });
      $scope.$on('terminalTextFinish', function() {
        console.log('broadcast has worked');
        $timeout(function () {
          $scope.setHomeBtn = true;
        }, 2000);
      });
      this.peekBtnClick = function() {
        
      }

  }]);

})();