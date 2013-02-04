'use strict';

angular.module('pubblicoApp.filters', []).
  filter('join', [function() {
    return function (values, delimiter) {
      if (angular.isArray(values)) {
        return values.join(delimiter);
      }
    }
  }]);
