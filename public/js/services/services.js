'use strict';

angular.module('pubblicoApp.services', ['ngResource']).
  factory('User', ['$http', function($http) {
    return {
      attach: function(scope) {
        $http.get('/passport').success(function(data, status) {
          scope.user = data.user;
          if (scope.user) {
            scope.user.display = scope.user.name || scope.user.email;
          }
        });
      },
      get: function(callback) {
        $http.get('/passport').success(function(data) {
          callback(data);
        });
      }
    };
  }]).
  factory('Conference', ['$resource', function($resource) {
    return $resource('http://petrh.apiary.io/api/v1/conferences/:conference', {}, {
      index: { method: 'JSONP', isArray: true }
    });
  }]).
  factory('Submission', ['$resource', function($resource) {
    return $resource('http://petrh.apiary.io/api/v1/conferences/:conference/submissions/:submission', {}, {
      index: { method: 'JSONP', isArray: true }
    });
  }]).
  factory('nowTime', ['$timeout', function($timeout) {
    var nowTime;
    (function updateTime() {
      nowTime = Date.now();
      $timeout(updateTime, 1000);
    }());
    return function() {
      return nowTime;
    };
  }]);

angular.module('pubblicoApp').
  value('version', '0.1');

/** Mock HTTP */
angular.module('pubblicoApp.mock', ['ngMockE2E']).
  run(['$httpBackend', function($httpBackend) {
    apiary.forEach(function(section){
      var resources = section.resources;
      resources.forEach(function(res){
        var url = '/api/v1' + res.url;
        url = url.replace(/{[^}]+}/g, 'PUBBLICO_PARAM');
        // http://stackoverflow.com/questions/6828637/escape-regexp-strings
        url = url.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + '' + '-]', 'g'), '\\$&');
        url = url.replace(/PUBBLICO_PARAM/g, '([^&]*)');
        url = new RegExp(url + '$');
        switch (res.method) {
          case 'GET':
            $httpBackend.whenGET(url).respond(res.responses[0].body);
            break;
          case 'POST':
            $httpBackend.whenPOST(url).respond(res.responses[0].body);
            break;
          case 'PUT':
            $httpBackend.whenPUT(url).respond(res.responses[0].body);
            break;
          case 'DELETE':
            $httpBackend.whenDELETE(url).respond(res.responses[0].body);
            break;
        }
      });
    });
    $httpBackend.whenGET(/^\/partials\//).passThrough();
  }]);
