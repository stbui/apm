angular.module('playerApp').directive('step', [
    function () {
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
            link: function (a, b, c) {
                a.$watch('data', function (b) {
                    b && ((a.data = b), (a.modalSize = b.modalSize), (a.stepStyle = b.stepStyle));
                });
                a.$watch('updateHorizontalScrollbar', function () {
                    a.updateHorizontalScrollbar && a.updateHorizontalScrollbar('scrollTo', 0);
                });
                a.showDetails = function () {
                    b
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
