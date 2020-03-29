angular.module('playerApp').filter('activityTypesFilter', [
    'utils',
    function(a) {
        return function(b, c) {
            if (!c) return b;
            var d = [];
            return (
                a.forEach(b, function(a) {
                    c[a.type] && d.push(a);
                }),
                d
            );
        };
    },
]);
