const NOT_AVAILABLE = 'Not available';

const sessionDetails = {};

angular
    .module('playerApp')
    .constant('NOT_AVAILABLE', 'Not available')
    .directive('sessionDetails', [
        '$filter',
        'NOT_AVAILABLE',
        function($filter, NOT_AVAILABLE) {
            return {
                restrict: 'E',
                templateUrl: function(a, b) {
                    var c = 'common/templates/sections.html';
                    return b.templateRoot ? b.templateRoot + c : c;
                },
                replace: !0,
                scope: { sessionData: '=' },
                link: function($scope) {
                    function d(d) {
                        var e, f;

                        d.device.browserName &&
                            d.device.browserVersion &&
                            (e = d.device.browserName + ' ' + d.device.browserVersion);

                        angular.isDefined(d.screenWidth) &&
                            angular.isDefined(d.screenHeight) &&
                            (f = d.screenWidth + ' x ' + d.screenHeight);
                        $scope.sections = [
                            {
                                name: 'Session',
                                items: [
                                    { label: 'Length', value: $filter('lengthformat')(d.length) },
                                    {
                                        label: 'Start',
                                        value: $filter('detaileddateformat')(d.start),
                                    },
                                    {
                                        label: 'Last active',
                                        value: $filter('detaileddateformat')(d.lastActive),
                                    },
                                    {
                                        label: 'Start page',
                                        isLink: !!d.pageUrl,
                                        value: d.pageUrl || NOT_AVAILABLE,
                                    },
                                    {
                                        label: 'Referrer',
                                        isLink: !!d.referrer,
                                        value: d.referrer || NOT_AVAILABLE,
                                    },
                                ],
                            },
                            {
                                name: 'Device',
                                items: [
                                    { label: 'Browser', value: e || NOT_AVAILABLE },
                                    {
                                        label: 'Layout engine',
                                        value: d.device.layoutName || NOT_AVAILABLE,
                                    },
                                    { label: 'OS', value: d.device.os || NOT_AVAILABLE },
                                    { label: 'Product', value: d.device.product || NOT_AVAILABLE },
                                    {
                                        label: 'Manufacturer',
                                        value: d.device.manufacturer || NOT_AVAILABLE,
                                    },
                                    { label: 'Screen', value: f || NOT_AVAILABLE },
                                ],
                            },
                            {
                                name: 'Location',
                                items: [
                                    { label: 'IP', value: d.location.ip || NOT_AVAILABLE },
                                    { label: 'Country', value: d.location.country || NOT_AVAILABLE },
                                    { label: 'City', value: d.location.city || NOT_AVAILABLE },
                                ],
                            },
                        ];
                    }
                    $scope.$watch('sessionData', function(a) {
                        a && d(a);
                    });
                },
            };
        },
    ]);
