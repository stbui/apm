angular.module('playerApp').directive('draggable', function() {
    return {
        restrict: 'A',
        scope: { axis: '@', enableHandle: '=', disableHandle: '=' },
        link: function(a, b, c) {
            var d = $(b).draggable({
                axis: a.axis,
                containment: 'parent',
                disabled: !0,
            });
            (a.enableHandle = function() {
                d && d.draggable('enable');
            }),
                (a.disableHandle = function() {
                    d && d.draggable('disable');
                });
        },
    };
});
