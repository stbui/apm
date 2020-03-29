angular
    .module('playerApp')
    .constant('NOT_AVAILABLE', 'Not available')
    .directive('sessionDetails', [
        '$filter',
        'NOT_AVAILABLE',
        function(a, b) {
            return {
                restrict: 'E',
                templateUrl: '../templates/sections.html',
                replace: !0,
                scope: { sessionData: '=' },
                link: function(c) {
                    function d(d) {
                        var e, f;
                        angular.isDefined(d.browserName) &&
                            angular.isDefined(d.browserVersion) &&
                            (e = d.browserName + ' ' + d.browserVersion),
                            angular.isDefined(d.screenWidth) &&
                                angular.isDefined(d.screenHeight) &&
                                (f = d.screenWidth + ' x ' + d.screenHeight),
                            (c.sections = [
                                {
                                    name: 'Session',
                                    items: [
                                        {
                                            label: 'Length',
                                            value: a('lengthformat')(d.length),
                                        },
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
                                            value: d.layoutName || b,
                                        },
                                        { label: 'OS', value: d.os || b },
                                        {
                                            label: 'Product',
                                            value: d.product || b,
                                        },
                                        {
                                            label: 'Manufacturer',
                                            value: d.manufacturer || b,
                                        },
                                        { label: 'Screen', value: f || b },
                                    ],
                                },
                                {
                                    name: 'Location',
                                    items: [
                                        { label: 'IP', value: d.ip || b },
                                        {
                                            label: 'Country',
                                            value: d.country || b,
                                        },
                                        {
                                            label: 'City',
                                            value: d.city || b,
                                        },
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
