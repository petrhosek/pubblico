'use strict';

angular.module('pubblicoApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  /*directive('gravatar', function () {
    return {
      restrict:"EAC",
      link: function (scope, elm, attrs) {
        scope.$watch(attrs.email, function (value) {
          if ((value !== null) && (value !== undefined) && (value !== '')) {
            var hash = md5(value.toLowerCase());
            var size = attrs.size;
            if ((size=== null) || (size == undefined) || (size == '')){
              size = 40;
            }
            var rating = attrs.rating;
            if ((rating === null) || (rating === undefined) || (rating === '')){
              rating = 'pg';
            }
            var defaultUrl = attrs.default;
            if((defaultUrl === null) || (defaultUrl === undefined) || (defaultUrl === '')) {
              defaultUrl = '404';
            }
            var tag = '<img src="http://www.gravatar.com/avatar/' + hash + '?s=' + size + '&r=' + rating + '&d=' + defaultUrl + '" >'
            elm.append(tag);
          }
        });
      }};
  }).*/
  directive('uiModal', ['$timeout', function(timeout) {
    return {
      require: 'ngModel',
      link: function (scope, elm, attrs, model) {
        // helper so you don't have to type class="modal hide"
        elm.addClass('modal hide');
        scope.$watch(attrs.ngModel, function(value) {
            elm.modal(value && 'show' || 'hide');
        });
        elm.on('show.ui', function() {
          $timeout(function() {
            model.$setViewValue(true);
          });
        });
        elm.on('hide.ui', function() {
          $timeout(function() {
            model.$setViewValue(false);
          });
        });
      }
    };
  }]);
