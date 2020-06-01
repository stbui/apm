import { userIdentityService } from './common';
import { USER_DETAILS_ANIMATION_TIME, NOT_AVAILABLE } from './constant';
import { player } from './player';
interface IScope {
    displayName: string;
    email: string;
    expandableItems: any;
    isExpanded: boolean;
    shouldShowMask: boolean;
    scrollbarConfig: object;
    // [key: string]: any;
}

angular.module('playerApp').directive('userIdentityDetails', [
    'player',
    'userIdentityService',
    'NOT_AVAILABLE',
    'USER_DETAILS_ANIMATION_TIME',
    function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/userIdentityDetails.html',
            scope: { userIdentityData: '=', hideMask: '=' },
            link: function($scope: IScope, $element, g) {
                function h(a) {
                    a = a || {};
                    var d = userIdentityService.formatCustomFields(a.customFields);
                    d.unshift({ label: 'User ID', value: a.identifier || NOT_AVAILABLE });
                    $scope.displayName = a.displayName || NOT_AVAILABLE;
                    $scope.email = a.email;
                    $scope.expandableItems = d;
                }
                function i() {
                    var b = n.height();
                    k();
                    var c = n.height(),
                        d = o.outerHeight();
                    l(b);
                    player.fireUserDetailsResize($scope, d);
                    m(c);
                }
                function j() {
                    var b = o.height() - n.height();
                    n.animate({ height: 0 }, USER_DETAILS_ANIMATION_TIME);
                    player.fireUserDetailsResize($scope, b);
                    setTimeout(function() {
                        n.addClass('collapsed');
                    }, USER_DETAILS_ANIMATION_TIME);
                }
                function k() {
                    n.css('height', 'auto');
                    n.removeClass('collapsed');
                }
                function l(a) {
                    n.height(a);
                    n.addClass('collapsed');
                }
                function m(a) {
                    setTimeout(function() {
                        n.animate({ height: a }, USER_DETAILS_ANIMATION_TIME);
                        n.removeClass('collapsed');
                    });
                }
                $scope.isExpanded = !1;
                $scope.shouldShowMask = !0;
                var n = $element.find('.expandable-user-details'),
                    o = n.parent();
                $scope.$watch('userIdentityData', function(a) {
                    h(a);
                });
                $scope.scrollbarConfig = {
                    autoHideScrollbar: !1,
                    theme: 'light',
                    mouseWheel: { scrollAmount: 50 },
                    scrollInertia: 0,
                };
                $scope.toggleUserDetails = function(a) {
                    'Range' !== a.view.getSelection().type &&
                        ($scope.isExpanded ? j() : i(), ($scope.isExpanded = !$scope.isExpanded));
                };
                $scope.hideMask = function() {
                    $scope.shouldShowMask = !1;
                };
            },
        };
    },
]);
