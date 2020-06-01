angular.module('playerApp').directive('step', [
    function() {
        return {
            restrict: 'E',
            replace: !0,
            templateUrl: 'templates/step.html',
            scope: {
                data: '=',
                isSelected: '=',
                isExecuted: '=',
                isExpanded: '=',
                onStepExpand: '&',
                selectStep: '&',
            },
            link: function($scope, $element, c) {
                $scope.$watch('data', function(b) {
                    b && (($scope.data = b), ($scope.modalSize = b.modalSize), ($scope.stepStyle = b.stepStyle));
                });
                $scope.$watch('updateHorizontalScrollbar', function() {
                    $scope.updateHorizontalScrollbar && $scope.updateHorizontalScrollbar('scrollTo', 0);
                });
                $scope.showDetails = function() {
                    $element
                        .find('.step-details')
                        .slideToggle()
                        .closest('.step')
                        .toggleClass('is-open')
                        .siblings()
                        .removeClass('is-open')
                        .find('.step-details')
                        .slideUp(),
                        a.onStepExpand();
                };
            },
        };
    },
]);
