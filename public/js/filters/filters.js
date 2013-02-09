'use strict';

angular.module('pubblicoApp.filters', []).
  filter('ago', ['nowTime', function (nowTime) {
    return function (input) {
      return moment(input).from(nowTime());
    }
  }]).
  filter('join', [function() {
    return function (values, delimiter) {
      if (angular.isArray(values)) {
        return values.join(delimiter);
      }
    }
  }]);
