'use strict';

angular.module('pubblicoApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('gravatar', function () {
    return {
      restrict: "EAC",
      link: function (scope, elm, attrs) {
        scope.$watch(attrs.email, function (value) {
          if ((value !== null) && (value !== undefined) && (value !== '')) {
            var hash = md5(value.toLowerCase())
              , size = attr.size || 40
              , rating = attrs.rating || 'pg'
              , defaultUrl = attrs.default || '404';
            var tag = '<img src="http://www.gravatar.com/avatar/' + hash + '?s=' + size + '&r=' + rating + '&d=' + defaultUrl + '" >'
            elm.append(tag);
          }
        });
      }};
  }).
  directive('modalist', function() {
    return {
      restrict: "A",
      link: function(scope, elm, attrs) {
        function show() {
          var modal = attrs.modalist;
          var element = angular.element(modal);
          element.modal('show');
        }
        elm.bind('click', show());
      }
    };
  });
