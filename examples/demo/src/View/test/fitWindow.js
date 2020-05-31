angular.module('playerApp').directive('fitWindow', [
    '$window',
    '$timeout',
    function ($window, $timeout) {
        return function (c, d) {
            function e() {
                $timeout(function () {
                    d.height(f.height());
                    d.width(f.width());
                });
            }

            var f = angular.element($window);

            e();

            f.on('resize', e);
        };
    },
]);
