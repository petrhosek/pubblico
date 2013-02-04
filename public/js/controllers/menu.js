'use strict';

angular.module('publicumApp').controller('MenuNotificationsCtrl', ['$scope',
    function ($scope) {
}]);

angular.module('publicumApp').controller('MenuSearchCtrl', ['$scope', '$location'
    function ($scope, $location) {
  $scope.search = function() {
    $location.path('/search/' + $scope.query);
  }
}]);

angular.module('publicumApp').controller('MenuUserCtrl', ['$scope',
    function ($scope) {
}]);
