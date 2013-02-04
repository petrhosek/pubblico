'use strict';

angular.module('pubblicoApp', ['pubblicoApp.filters', 'pubblicoApp.services', 'pubblicoApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: 'SubmissionsListCtrl'
      }).
      when('/search', {
        templateUrl: 'partials/search',
        controller: 'SearchCtrl'
      }).
      when('/conferences/:id', {
        templateUrl: 'partials/conference',
        controller: 'ConferenceDetailCtrl'
      }).
      when('/newSubmission', {
        templateUrl: 'partials/newSubmission',
        controller: 'SubmissionsNewCtrl'
      }).
      /*when('/readSubmission/:id', {
        templateUrl: 'partials/readSubmission',
        controller: 'SubmissionsReadCtrl'
      }).
      when('/editSubmission/:id', {
        templateUrl: 'partials/editSubmission',
        controller: 'SubmissionsEditCtrl'
      }).
      when('/deleteSubmission/:id', {
        templateUrl: 'partials/deleteSubmission',
        controller: 'SubmissionsDeleteCtrl'
      }).*/
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
