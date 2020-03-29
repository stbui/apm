angular.module('playerApp').directive('resize', [
    '$window',
    '$timeout',
    function(a, b) {
        return {
            link: function(c, d, e) {
                function f() {
                    b(function() {
                        (c.containerWidth = g.width()), (c.containerHeight = g.height());
                    });
                }
                var g = angular.element(d).parent();
                f(), angular.element(a).on('resize', f);
            },
        };
    },
]);
