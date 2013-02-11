'use strict';

define(['app'], function(app) {
  app.controller('MenuNotificationsCtrl', ['$scope',
      function ($scope) {
  }]);

  app.controller('MenuSearchCtrl', ['$scope', '$location',
      function ($scope, $location) {
    $scope.search = function() {
      $location.path('/search/' + $scope.query);
    }
  }]);

  app.controller('MenuUserCtrl', ['$scope', 'User',
      function ($scope, User) {
    User.attach($scope);
  }]);

  app.controller('SearchCtrl', ['$scope', 'Conference',
      function ($scope, $routeParams, Conference) {
    $scope.query = $routeParams.query;
    $scope.conferences = Conference.query({query: $scope.query});
  }]);

  app.controller('HomeCtrl', ['$scope', '$http', 'Conference',
      function ($scope, $http, Conference) {
    $http.jsonp('http://petrh.apiary.io/api/v1/events').
      success(function(data, status, headers, config) {
        $scope.events = data;
      }).
      error(function(data, status, headers, config) {
       console.log(data);
      });
  }]);

  app.controller('SidebarConferenceCtrl', ['$scope', 'Conference',
      function ($scope, Conference) {
    $scope.conferences = Conference.query();
  }]);

  app.controller('ConferenceDetailCtrl', ['$scope', '$routeParams', 'Conference', 'Submission',
      function ($scope, $routeParams, Conference, Submission) {
    $scope.conference = Conference.get({conference: $routeParams.id});
    $scope.submissions = Submission.query({conference: $routeParams.id});
    /*$scope.showSubmission = function(id) {
      $scope.$parent.$broadcast('show', id);
    };*/
    $scope.edit = function(submission) {
      $scope.submission = submission;
      $scope.$parent.$broadcast('show', submission);
    };
    $scope.$on('edit', function() {
      $scope.$broadcast('show', $scope.submission);
    });
  }]);

  app.controller('ConferenceEditCtrl', ['$scope', '$routeParams', 'Conference',
      function ($scope, $routeParams, Conference) {
    $scope.conference = {};
    $scope.submit = function() {
      Conference.save($scope.conference);
    }
  }]);

  app.controller('SubmissionsListCtrl', ['$scope', 'Submission',
      function ($scope, Submission) {
    //$scope.submissions = Submission.query();
  }]);

  app.controller('SubmissionsNewCtrl', ['$scope', '$location', 'User', 'Submission',
      function ($scope, $location, User, Submission) {
    $scope.$on('show', function($_scope, submission) {
      $scope.submission = {};
      User.get(function(user) {
        $scope.submission.author = user;
      });
      $scope.modalShown = true;
    });
    $scope.submit = function() {
      Submission.save($scope.submission);
    };
    $scope.close = function() {
      $scope.modalShown = false;
    };
  }]);

  app.controller('SubmissionsReadCtrl', ['$scope', '$routeParams', 'Submission',
      function ($scope, $routeParams, Submission) {
    $scope.submission = Submission.get({conference: $routeParams.conference, submission: $routeParams.submission});
  }]);

  app.controller('SubmissionsEditCtrl', ['$scope', '$location', '$routeParams', 'Submission',
      function ($scope, $location, $routeParams, Submission) {
    $scope.$on('show', function($_scope, submission) {
      $scope.submission = submission;
      $scope.modalShown = true;
    });
    //$scope.submission = Submission.get({conference: $routeParams.conference, submission: $routeParams.submission});
    $scope.submit = function() {
      Submission.save($scope.submission);
      //$scope.submission.$save();
    };
    $scope.close = function() {
      $scope.modalShown = false;
    };
  }]);

  app.controller('SubmissionsDeleteCtrl', ['$scope', '$location', '$routeParams', 'Submission',
      function ($scope, $location, $routeParams, Submission) {
  }]);

  return app;
});
