angular
    .module('playerApp')
    .constant('JSON_INDENTATION', 4)
    .constant('NEW_LINE_EXPRESSION', /\r|\n/)
    .directive('consoleLog', [
        '$timeout',
        'player',
        'utils',
        'lodash',
        'JSON_INDENTATION',
        'NEW_LINE_EXPRESSION',
        function(a, b, c, d, e, f) {
            return {
                restrict: 'E',
                replace: !0,
                templateUrl: 'templates/consoleLog.html',
                scope: {
                    log: '=',
                    isExecuted: '=',
                    isSelected: '=',
                    onLogToggle: '=',
                    selectLog: '&',
                },
                link: function(b, g, h) {
                    function i() {
                        var d = j(b.log.details.message);
                        (b.log.details.formattedMessage = d.formattedMessage),
                            (b.log.isMultiLine = d.isMultiLine),
                            (b.log.details.stackFrames = k(b.log.details.stackFrames)),
                            (b.log.searchLabel = b.log.searchLabel || l(b.log.details)),
                            (b.log.isMultiLine ||
                                (b.log.details.stackFrames && b.log.details.stackFrames.length > 0)) &&
                                (b.log.isExpandable = !0),
                            a(function() {
                                var a = g.find('.message-container .message');
                                b.log.isExpandable = b.log.isExpandable || c.isEllipsisActive(a[0]);
                            }, 250);
                    }
                    function j(a) {
                        try {
                            var b = angular.fromJson(a);
                            return {
                                isMultiLine: !0,
                                formattedMessage: angular.toJson(b, e),
                            };
                        } catch (c) {
                            return {
                                isMultiLine: f.exec(a),
                                formattedMessage: a,
                            };
                        }
                    }
                    function k(a) {
                        if (a && 0 !== a.length)
                            return d.map(a, function(a) {
                                if (a) return a.trim();
                            });
                    }
                    function l(a) {
                        var b = a.stackFrames ? a.stackFrames.join('') : '';
                        return a.message + b;
                    }
                    var m = g.find('.message-container');
                    (b.toggleMessage = function(c) {
                        if ('Range' !== c.view.getSelection().type) {
                            var d = m.outerHeight();
                            (b.log.isExpanded = !b.log.isExpanded),
                                a(function() {
                                    var a = m.outerHeight(),
                                        c = a - d;
                                    b.onLogToggle(b.log.activityIndex, c);
                                });
                        }
                    }),
                        b.$watch('log.activityIndex', i);
                },
            };
        },
    ]);
