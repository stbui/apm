angular
    .module('playerApp')
    .constant('NOT_AVAILABLE', 'Not available')
    .directive('sessionDetails', [
        '$filter',
        'NOT_AVAILABLE',
        function(a, b) {
            return {
                restrict: 'E',
                templateUrl: function(a, b) {
                    var c = 'common/templates/sections.html';
                    return b.templateRoot ? b.templateRoot + c : c;
                },
                replace: !0,
                scope: { sessionData: '=' },
                link: function(c) {
                    function d(d) {
                        var e, f;
                        d.device.browserName &&
                            d.device.browserVersion &&
                            (e = d.device.browserName + ' ' + d.device.browserVersion),
                            angular.isDefined(d.screenWidth) &&
                                angular.isDefined(d.screenHeight) &&
                                (f = d.screenWidth + ' x ' + d.screenHeight),
                            (c.sections = [
                                {
                                    name: 'Session',
                                    items: [
                                        { label: 'Length', value: a('lengthformat')(d.length) },
                                        {
                                            label: 'Start',
                                            value: a('detaileddateformat')(d.start),
                                        },
                                        {
                                            label: 'Last active',
                                            value: a('detaileddateformat')(d.lastActive),
                                        },
                                        {
                                            label: 'Start page',
                                            isLink: !!d.pageUrl,
                                            value: d.pageUrl || b,
                                        },
                                        {
                                            label: 'Referrer',
                                            isLink: !!d.referrer,
                                            value: d.referrer || b,
                                        },
                                    ],
                                },
                                {
                                    name: 'Device',
                                    items: [
                                        { label: 'Browser', value: e || b },
                                        {
                                            label: 'Layout engine',
                                            value: d.device.layoutName || b,
                                        },
                                        { label: 'OS', value: d.device.os || b },
                                        { label: 'Product', value: d.device.product || b },
                                        {
                                            label: 'Manufacturer',
                                            value: d.device.manufacturer || b,
                                        },
                                        { label: 'Screen', value: f || b },
                                    ],
                                },
                                {
                                    name: 'Location',
                                    items: [
                                        { label: 'IP', value: d.location.ip || b },
                                        { label: 'Country', value: d.location.country || b },
                                        { label: 'City', value: d.location.city || b },
                                    ],
                                },
                            ]);
                    }
                    c.$watch('sessionData', function(a) {
                        a && d(a);
                    });
                },
            };
        },
    ]);
