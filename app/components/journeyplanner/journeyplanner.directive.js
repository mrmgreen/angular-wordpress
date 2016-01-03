(function() {
  'use strict',

  angular.module('myApp.journeyplanner')

  .directive('myCustomer', function() {
    return {
      template: 'Name {{  journeyplanner.customer.name }}'
    };
  });

})();

