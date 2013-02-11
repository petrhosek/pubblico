'use strict';

require.config({
  paths: {
    jquery: '../lib/jquery/jquery-1.9.0',
    bootstrap: '../lib/bootstrap/bootstrap',
    underscore: '../lib/underscore/underscore',
    moment: '../lib/moment/moment',
    md5: '../lib/md5/md5',
    angular: '../lib/angular/angular',
    angularResource: '../lib/angular/angular-resource',
    text: '../lib/require/text'
  },
  shim: {
    'angular': { exports: 'angular', deps: ['jquery'] },
    'angularResource': { deps: ['angular'] },
    'bootstrap': { deps: ['jquery'] },
    'underscore': { exports: '_' }
  },
  priority: [
    'angular'
  ],
  urlArgs: 'v=1.1'
});

require([
  'angular',
  'app',
  'services/services',
  'controllers/controllers',
  'filters/filters',
  'directives/directives',
  'directives/modal',
  'routes'
], function(angular, app) {
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['pubblicoApp']);
  });
});
