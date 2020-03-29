angular.module('playerApp').directive('userIdentityDetails', [
    'player',
    'userIdentityService',
    'NOT_AVAILABLE',
    'USER_DETAILS_ANIMATION_TIME',
    function(a, b, c, d) {
        return {
            restrict: 'E',
            templateUrl: 'templates/userIdentityDetails.html',
            scope: { userIdentityData: '=', hideMask: '=' },
            link: function(e, f, g) {
                function h(a) {
                    a = a || {};
                    var d = b.formatCustomFields(a.customFields);
                    d.unshift({
                        label: 'User ID',
                        value: a.identifier || c,
                    }),
                        (e.displayName = a.displayName || c),
                        (e.email = a.email),
                        (e.expandableItems = d);
                }
                function i() {
                    var b = n.height();
                    k();
                    var c = n.height(),
                        d = o.outerHeight();
                    l(b), a.fireUserDetailsResize(e, d), m(c);
                }
                function j() {
                    var b = o.height() - n.height();
                    n.animate({ height: 0 }, d),
                        a.fireUserDetailsResize(e, b),
                        setTimeout(function() {
                            n.addClass('collapsed');
                        }, d);
                }
                function k() {
                    n.css('height', 'auto'), n.removeClass('collapsed');
                }
                function l(a) {
                    n.height(a), n.addClass('collapsed');
                }
                function m(a) {
                    setTimeout(function() {
                        n.animate({ height: a }, d), n.removeClass('collapsed');
                    });
                }
                (e.isExpanded = !1), (e.shouldShowMask = !0);
                var n = f.find('.expandable-user-details'),
                    o = n.parent();
                e.$watch('userIdentityData', function(a) {
                    h(a);
                }),
                    (e.scrollbarConfig = {
                        autoHideScrollbar: !1,
                        theme: 'light',
                        mouseWheel: { scrollAmount: 50 },
                        scrollInertia: 0,
                    }),
                    (e.toggleUserDetails = function(a) {
                        'Range' !== a.view.getSelection().type &&
                            (e.isExpanded ? j() : i(), (e.isExpanded = !e.isExpanded));
                    }),
                    (e.hideMask = function() {
                        e.shouldShowMask = !1;
                    });
            },
        };
    },
]);
