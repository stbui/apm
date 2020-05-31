angular.module('playerApp').directive('resize', [
    '$window',
    '$timeout',
    function ($window, $timeout) {
        return {
            link: function (c, d, e) {
                function f() {
                    $timeout(function () {
                        c.containerWidth = g.width();
                        c.containerHeight = g.height();
                    });
                }
                var g = angular.element(d).parent();
                f();
                angular.element($window).on('resize', f);
            },
        };
    },
]);
