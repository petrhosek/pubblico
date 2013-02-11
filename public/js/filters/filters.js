'use strict';

define(['app', 'moment', 'md5'], function(app, moment, md5) {
  return app.
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
});
