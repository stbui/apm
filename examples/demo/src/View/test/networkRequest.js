angular.module('playerApp').directive('networkRequest', [
    function() {
        return {
            restrict: 'E',
            replace: !0,
            templateUrl: 'templates/networkRequest.html',
            scope: {
                networkRequest: '=',
                isSelected: '=',
                isExecuted: '=',
                isExpanded: '=',
                selectNetworkRequest: '=',
                showNetworkRequestDetails: '&',
            },
            link: function(a, b, c) {
                a.selectRequest = function(b) {
                    b.stopPropagation(), a.selectNetworkRequest(a.networkRequest);
                };
            },
        };
    },
]);
