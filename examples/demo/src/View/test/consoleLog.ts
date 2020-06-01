import lodash from 'lodash';
import { utils } from './common';

const JSON_INDENTATION = 4;
const NEW_LINE_EXPRESSION = /\r|\n/;

interface IScope {
    log: any;
    // [key: string]: any;
}
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
        function($timeout) {
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
                link: function($scope: IScope, $element, h) {
                    function i() {
                        var d = j($scope.log.details.message);
                        $scope.log.details.formattedMessage = d.formattedMessage;
                        $scope.log.isMultiLine = d.isMultiLine;
                        $scope.log.details.stackFrames = k($scope.log.details.stackFrames);
                        $scope.log.searchLabel = $scope.log.searchLabel || l($scope.log.details);
                        ($scope.log.isMultiLine ||
                            ($scope.log.details.stackFrames && $scope.log.details.stackFrames.length > 0)) &&
                            ($scope.log.isExpandable = !0);

                        $timeout(function() {
                            var a = $element.find('.message-container .message');
                            $scope.log.isExpandable = $scope.log.isExpandable || utils.isEllipsisActive(a[0]);
                        }, 250);
                    }
                    function j(message) {
                        try {
                            var b = angular.fromJson(message);
                            return {
                                isMultiLine: !0,
                                formattedMessage: angular.toJson(b, JSON_INDENTATION),
                            };
                        } catch (c) {
                            return { isMultiLine: NEW_LINE_EXPRESSION.exec(message), formattedMessage: message };
                        }
                    }
                    function k(a) {
                        if (a && 0 !== a.length)
                            return lodash.map(a, function(a) {
                                if (a) return a.trim();
                            });
                    }
                    function l(a) {
                        var b = a.stackFrames ? a.stackFrames.join('') : '';
                        return a.message + b;
                    }
                    var m = g.find('.message-container');
                    $scope.toggleMessage = function(c) {
                        if ('Range' !== c.view.getSelection().type) {
                            var d = m.outerHeight();
                            ($scope.log.isExpanded = !$scope.log.isExpanded),
                                $timeout(function() {
                                    var a = m.outerHeight(),
                                        c = a - d;
                                    $scope.onLogToggle($scope.log.activityIndex, c);
                                });
                        }
                    };
                    $scope.$watch('log.activityIndex', i);
                },
            };
        },
    ]);
