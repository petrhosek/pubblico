'use strict';

angular.module('pubblicoApp.filters', []).
  filter('ago', ['nowTime', function (nowTime) {
    return function (value) {
      return moment(value).from(nowTime());
    }
  }]).
  filter('md5', [function() {
    return function (value) {
      return md5(value);
    }
  }]).
  filter('join', [function() {
    return function (values, delimiter) {
      if (angular.isArray(values)) {
        return values.join(delimiter);
      }
    }
  }]);
