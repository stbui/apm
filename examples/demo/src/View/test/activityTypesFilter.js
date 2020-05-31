angular.module('playerApp').filter('activityTypesFilter', [
    'utils',
    function (utils) {
        return function (b, c) {
            if (!c) return b;
            var d = [];

            utils.forEach(b, function (a) {
                c[a.type] && d.push(a);
            });

            return d;
        };
    },
]);
