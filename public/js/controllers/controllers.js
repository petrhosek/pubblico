'use strict';

angular.module('pubblicoApp').controller('MenuNotificationsCtrl', ['$scope',
    function ($scope) {
}]);

angular.module('pubblicoApp').controller('MenuSearchCtrl', ['$scope', '$location',
    function ($scope, $location) {
  $scope.search = function() {
    $location.path('/search/' + $scope.query);
  }
}]);

angular.module('pubblicoApp').controller('MenuUserCtrl', ['$scope',
    function ($scope) {
}]);

angular.module('pubblicoApp').controller('SearchCtrl', ['$scope', 'Conference',
    function ($scope, $routeParams, Conference) {
  $scope.query = $routeParams.query;
  $scope.conferences = Conference.query({query: $scope.query});
}]);

angular.module('pubblicoApp').controller('SidebarConferenceCtrl', ['$scope', 'Conference',
    function ($scope, Conference) {
  var xxx = Conference.index();
  $scope.conferences = Conference.query();
}]);

angular.module('pubblicoApp').controller('ConferenceDetailCtrl', ['$scope', '$routeParams', 'Conference', 'Submission',
    function ($scope, $routeParams, Conference, Submission) {
  $scope.conference = Conference.get({conference: $routeParams.id});
  $scope.submissions = Submission.query({conference: $routeParams.id});
  /*$scope.showSubmission = function(id) {
    $scope.$parent.$broadcast('show', id);
  };
  $scope.edit = function(submission) {
    $scope.submission = submission;
  };
  $scope.$on(edit, function() {
    $scope.$broadcast('show', $scope.submission);
  });*/
}]);

angular.module('pubblicoApp').controller('SubmissionsListCtrl', ['$scope', 'Submission',
    function ($scope, Submission) {
  //$scope.submissions = Submission.query();
}]);

angular.module('pubblicoApp').controller('SubmissionsNewCtrl', ['$scope', '$location', 'Submission',
    function ($scope, $location, Submission) {
  $scope.submission = {};
  $scope.submit = function() {
    Submission.save($scope.submission);
  };
}]);

angular.module('pubblicoApp').controller('SubmissionsReadCtrl', ['$scope', '$routeParams', 'Submission',
    function ($scope, $routeParams, Submission) {
  $scope.submission = Submission.get({conference: $routeParams.conference, submission: $routeParams.submission});
}]);

angular.module('pubblicoApp').controller('SubmissionsEditCtrl', ['$scope', '$location', '$routeParams', 'Submission',
    function ($scope, $location, $routeParams, Submission) {
  /*$scope.$on('show', function($_scope, id) {
    $scope.modalShown = true;
  });*/
  $scope.submission = Submission.get({conference: $routeParams.conference, submission: $routeParams.submission});
  $scope.edit = function() {
    $scope.submission.$save();
  };
  /*$scope.close = function() {
  };*/
}]);

angular.module('pubblicoApp').controller('SubmissionsDeleteCtrl', ['$scope', '$location', '$routeParams', 'Submission',
    function ($scope, $location, $routeParams, Submission) {
}]);
