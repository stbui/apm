angular.module('playerApp').controller('SessionDetailsController', [
    '$scope',
    '$mdDialog',
    'sessionData',
    function(a, b, c) {
        (a.sessionData = c),
            (a.close = function() {
                b.hide();
            });
    },
]);
