angular.module('playerApp').controller('SessionDetailsController', [
    '$scope',
    '$mdDialog',
    'sessionData',
    function ($scope, $mdDialog, sessionData) {
        $scope.sessionData = sessionData;
        $scope.close = function () {
            $mdDialog.hide();
        };
    },
]);
