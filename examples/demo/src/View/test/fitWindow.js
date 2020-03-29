angular.module('playerApp').directive('fitWindow', [
    '$window',
    '$timeout',
    function(a, b) {
        return function(c, d) {
            function e() {
                b(function() {
                    d.height(f.height()), d.width(f.width());
                });
            }
            var f = angular.element(a);
            e(), f.on('resize', e);
        };
    },
]);
