'use strict';
angular
    .module('commonApp', [
        'ngCookies',
        'base64',
        'ngAnimate',
        'frapontillo.bootstrap-switch',
        'toastr',
        'ngSanitize',
        'angular-momentjs',
        'ui.bootstrap.tooltip',
        'ngLodash',
        'LocalStorageModule',
        'md.data.table',
        'ngMaterial',
    ])
    .config([
        '$cookiesProvider',
        'BUILD_ENV',
        function (a, b) {
            !b.IS_DEV && b.IS_SAAS && (a.defaults.domain = '.sessionstack.com');
        },
    ])
    .config([
        '$httpProvider',
        function (a) {
            a.defaults.headers.get || (a.defaults.headers.get = {}),
                (a.defaults.headers.get['If-Modified-Since'] = '0'),
                (a.defaults.headers.get['Cache-Control'] = 'no-cache'),
                (a.defaults.headers.get.Pragma = 'no-cache');
        },
    ])
    .config([
        '$mdThemingProvider',
        function (a) {
            var b = a.extendPalette('blue', {
                500: '#007afd',
                700: '#007afd',
            });
            a.definePalette('sessionstackBlue', b),
                a
                    .theme('sessionStackBlueTheme')
                    .primaryPalette('sessionstackBlue', {
                        default: '500',
                    })
                    .accentPalette('sessionstackBlue', {
                        default: '700',
                    });
        },
    ]),
    angular.module('commonApp').constant('ANALYTICS_EVENT_TYPES', {
        CONSOLE_OPENED: 'console_opened',
        SESSIONS_DATE_FILTER_APPLIED: 'sessions_date_filter_applied',
        SESSIONS_DATE_FILTER_OPENED: 'sessions_date_filter_opened',
        SUPPORT_TOOLKIT_ENABLED: 'support_toolkit_enabled',
        NETWORK_TAB_OPENED: 'network_tab_opened',
        LIVE_SESSION_OPENED: 'live_session_opened',
        LIVE_SESSION_STOPPED: 'live_session_stopped',
        SESSION_OPENED: 'session_opened',
        PROJECT_OPENED: 'project_opened',
        PROJECT_SETTINGS_OPENED: 'project_settings_opened',
    }),
    angular
        .module('commonApp')
        .constant('SERVER_URL', 'https://app.sessionstack.com/api/')
        .constant('BROKER_URL', 'wss://broker.sessionstack.com/api/')
        .constant('BUILD_ENV', {
            IS_DEV: !1,
            PLAYER_ONLINE_MODE: !0,
            IS_SAAS: !0,
            USE_TESTING_INTERCOM: !1,
        })
        .constant('FRONTEND_URL', 'https://app.sessionstack.com/'),
    angular.module('commonApp').constant('HTTP_STATUS', {
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        CONFLICT: 409,
    }),
    angular.module('commonApp').constant('LOG_LEVEL', {
        INFO: 'info',
        DEBUG: 'debug',
        WARN: 'warn',
        ERROR: 'error',
    }),
    angular.module('commonApp').constant('MESSAGES', {
        GENERIC_ERROR: 'Please try again. If this message persists, please contact the support team.',
    }),
    angular.module('commonApp').constant('TIME_PERIOD', {
        HOUR: {
            label: '1 Hour',
            value: 3600,
        },
        DAY: {
            label: '1 Day',
            value: 86400,
        },
        WEEK: {
            label: '1 Week',
            value: 604800,
        },
        MONTH: {
            label: '1 Month',
            value: 2592e3,
        },
        ALL_TIME: {
            label: 'All time',
            value: null,
        },
    }),
    angular.module('commonApp').directive('detailsTableRow', [
        function () {
            return {
                restrict: 'E',
                templateUrl: function (a, b) {
                    var c = 'common/templates/detailsTableRow.html';
                    return b.templateRoot ? b.templateRoot + c : c;
                },
                replace: !0,
                scope: {
                    row: '=',
                },
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('ANIMATION_TIME', 500)
        .directive('expandableRow', [
            '$timeout',
            'ANIMATION_TIME',
            function (a, b) {
                return {
                    restrict: 'E',
                    templateUrl: './common/templates/expandableRow.html',
                    replace: !0,
                    scope: {
                        template: '=',
                        api: '=?',
                        isExpanded: '=',
                        onExpand: '=',
                        data: '=',
                    },
                    link: function (c, d, e) {
                        function f() {
                            a(function () {
                                h.css('display', 'table-row');
                                var a = d.height();
                                d.css('height', 'auto');
                                var c = d.height();
                                d.height(a).animate(
                                    {
                                        height: c,
                                    },
                                    b
                                );
                            });
                        }
                        function g() {
                            d.animate(
                                {
                                    height: 0,
                                },
                                b
                            ),
                                a(function () {
                                    h.css('display', 'none');
                                }, b);
                        }
                        var h = d.closest('.expanded-row');
                        c.$watch('isExpanded', function (a) {
                            a ? c.onExpand(c, c.data, f) : g();
                        });
                    },
                };
            },
        ]),
    angular.module('commonApp').directive('grid', [
        '$timeout',
        '$q',
        '$mdMedia',
        'lodash',
        'utils',
        function (a, b, c, d, e) {
            return {
                restrict: 'E',
                templateUrl: './common/templates/grid.html',
                replace: !0,
                scope: {
                    externalClass: '@class',
                    config: '=',
                    reload: '=?',
                    collapseRow: '=?',
                    showColumn: '=',
                    hideColumn: '=',
                    searchText: '=',
                    setRows: '=?',
                    setDateRange: '=?',
                },
                link: function (a, f, g) {
                    function h(a, c) {
                        return a.remote && angular.isFunction(a.getRows)
                            ? a.getRows(c)
                            : b(function (b) {
                                  b(a.rows || []);
                              });
                    }
                    function i(b, d) {
                        a.$watch(
                            function () {
                                return c(b);
                            },
                            function (a) {
                                a && (d.mediaQuery = b);
                            }
                        );
                    }
                    angular.element('.content-container');
                    (a.rows = []),
                        (a.expandedRow = null),
                        (a.paginationConfig = {
                            currentPage: 1,
                        }),
                        (a.onRowSelectionChange = function () {
                            angular.isFunction(a.config.onRowSelectionChange) &&
                                a.config.onRowSelectionChange(a.selectedRows);
                        }),
                        a.$watch('config', function (b) {
                            angular.isObject(b) &&
                                ((a.multipleRowSelect = 'multiple' === b.rowSelection),
                                (a.rowSelect = b.rowSelection),
                                (a.selectedRows = []),
                                (a.paginationConfig.pageSize = b.pageSize),
                                (a.queryParams = b.queryParams || {}),
                                (a.queryParams.skip = a.queryParams.skip || 0),
                                (a.queryParams.limit = b.pageSize),
                                a.reload());
                        }),
                        (a.toggleRow = function (b, c) {
                            b.stopPropagation(), a.multipleRowSelect || (a.selectedRows = []);
                            var d = a.selectedRows.indexOf(c);
                            d > -1 ? a.selectedRows.splice(d, 1) : a.selectedRows.push(c), a.onRowSelectionChange();
                        }),
                        (a.toggleAllRows = function () {
                            a.selectedRows.length === a.rows.length
                                ? (a.selectedRows = [])
                                : a.selectedRows.length >= 0 && (a.selectedRows = a.rows.slice(0));
                        }),
                        (a.areAllRowsChecked = function () {
                            return a.selectedRows.length === a.rows.length;
                        }),
                        (a.isRowChecked = function (b) {
                            return a.selectedRows.indexOf(b) > -1;
                        }),
                        (a.expandOrCollapseRow = function (b, c) {
                            return a.expandedRow === c ? void a.collapseRow() : void (a.expandedRow = c);
                        }),
                        (a.collapseRow = function () {
                            a.expandedRow = null;
                        }),
                        a.$watch('searchText', function (b) {
                            angular.isUndefined(b) || ((a.queryParams.search = b), a.collapseRow(), a.reload());
                        }),
                        (a.setDateRange = function (b) {
                            angular.isUndefined(b) ||
                                (b.startDate === a.queryParams.startDate && b.endDate === a.queryParams.endDate) ||
                                ((a.queryParams.startDate = b.startDate),
                                (a.queryParams.endDate = b.endDate),
                                a.collapseRow(),
                                a.reload());
                        }),
                        (a.reload = function () {
                            (a.rowsLoading = h(a.config, a.queryParams)),
                                a.rowsLoading.then(function (b) {
                                    angular.isArray(b)
                                        ? ((a.rows = b), (a.paginationConfig.total = b.length))
                                        : ((a.rows = b.data), (a.paginationConfig.total = b.total)),
                                        e.isFunction(a.config.shouldShowTemplate) &&
                                            ((a.shouldShowTemplate = a.config.shouldShowTemplate(b)),
                                            (a.templatePath = a.config.templatePath)),
                                        (a.isDataReady = !0);
                                }),
                                (a.selectedRows = []),
                                a.onRowSelectionChange();
                        }),
                        (a.onPaginationChange = function (b, c) {
                            (a.queryParams.currentPage = b),
                                (a.queryParams.skip = c * (b - 1)),
                                a.collapseRow(),
                                a.reload();
                        }),
                        (a.onSortOrderChange = function (b) {
                            (a.queryParams.order = d.startsWith(b, '-') ? 'desc' : 'asc'),
                                (a.queryParams.sort = d.trimStart(b, '-')),
                                a.collapseRow(),
                                a.reload();
                        }),
                        (a.setRows = function (b) {
                            a.rows = b;
                        }),
                        angular.forEach(a.config.columns, function (a) {
                            angular.isDefined(a.columnWidths) &&
                                angular.forEach(a.columnWidths, function (b, c) {
                                    i(c, a);
                                });
                        });
                },
            };
        },
    ]),
    angular.module('commonApp').directive('gridCell', [
        '$compile',
        function (a) {
            return {
                scope: {
                    render: '=',
                    data: '=',
                    template: '=',
                    field: '=',
                },
                link: function (b, c, d) {
                    function e(a) {
                        return angular.isFunction(a.render)
                            ? a.render({
                                  $scope: a.isolatedScope,
                                  value: f(a),
                              })
                            : g(a);
                    }
                    function f(a) {
                        var b = a.field,
                            c = a.data;
                        if (angular.isString(b) && angular.isObject(c)) return c[b];
                    }
                    function g(a) {
                        return angular.isString(a.template)
                            ? a.template
                            : angular.isString(a.field) && angular.isObject(a.data)
                            ? '{{ data.' + a.field + ' }}'
                            : '{{ data }}';
                    }
                    (b.isolatedScope = b.$new()),
                        (b.isolatedScope.data = b.data),
                        c.html(e(b)),
                        a(c.contents())(b.isolatedScope);
                },
            };
        },
    ]),
    angular.module('commonApp').directive('loadingProgressBar', function () {
        return {
            templateUrl: './common/templates/loadingProgressBar.html',
            replace: !0,
            scope: {
                loadingProgress: '=',
            },
            restrict: 'E',
            link: function (a, b, c) {
                a.$watch('loadingProgress', function () {
                    if (angular.isDefined(a.loadingProgress)) {
                        var b = a.loadingProgress.minValue,
                            c = a.loadingProgress.maxValue,
                            d = a.loadingProgress.currentValue,
                            e = ((d - b) / (c - b)) * 100;
                        (a.percentage = Math.round(e)), (a.showPercentage = a.loadingProgress.isLoading);
                    }
                });
            },
        };
    }),
    angular.module('commonApp').directive('organizationUrlInput', [
        'FRONTEND_URL',
        function (a) {
            return {
                restrict: 'E',
                replace: !0,
                templateUrl: './common/templates/organizationUrlInput.html',
                scope: {
                    model: '=',
                    form: '=',
                },
                link: function (b, c, d) {
                    b.FRONTEND_URL = a;
                },
            };
        },
    ]),
    angular.module('commonApp').directive('requestLoading', [
        'loadingStatus',
        function (a) {
            return {
                link: function (b, c, d) {
                    function e() {
                        c.css('display', 'block');
                    }
                    function f() {
                        c.css({
                            display: 'none',
                            background: 'transparent',
                        });
                    }
                    a.onLoadingStart(e), a.onLoadingEnd(f);
                },
            };
        },
    ]),
    angular.module('commonApp').directive('resizableInput', function () {
        return {
            restrict: 'A',
            link: function (a, b) {
                var c = ['keyup', 'keypress', 'focus', 'blur', 'change'];
                angular.forEach(c, function (c) {
                    b.bind(c, function () {
                        a.inputWidth = 8 * b.val().length;
                    });
                });
            },
        };
    }),
    angular.module('commonApp').directive('searchInput', [
        '$timeout',
        function (a) {
            return {
                restrict: 'E',
                templateUrl: './common/templates/searchInput.html',
                replace: !0,
                scope: {
                    value: '=',
                    timeout: '@',
                    placeholder: '@',
                    externalClass: '@class',
                },
                link: function (b, c) {
                    (b.timeout = b.timeout ? parseInt(b.timeout) : 0),
                        (b.update = function () {
                            b.pendingPromise && a.cancel(b.pendingPromise),
                                (b.pendingPromise = a(function () {
                                    b.value = b.currentInputValue;
                                }, b.timeout));
                        }),
                        (b.clear = function () {
                            (b.currentInputValue = ''), b.update();
                        });
                },
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('DOWNLOAD_COMPLETED_COOKIE', 'session_download_completed')
        .directive('sessionDownloadButton', [
            '$window',
            '$cookies',
            '$interval',
            'session',
            'auth',
            'restSettings',
            'loadingStatus',
            'notification',
            'planLimitationNotification',
            'sessionstackManager',
            'DOWNLOAD_COMPLETED_COOKIE',
            'HTTP_STATUS',
            function (a, b, c, d, e, f, g, h, i, j, k, l) {
                return {
                    restrict: 'E',
                    template: '<button ng-transclude></button>',
                    replace: !0,
                    transclude: !0,
                    scope: {
                        sessionId: '=',
                    },
                    link: function (m, n, o) {
                        function p(b) {
                            r();
                            var c = q(b);
                            a.open(c, '_self');
                        }
                        function q(a) {
                            var b = 'sessions/' + a + '/download',
                                c = e.getAccessToken();
                            return (b += c ? '?access_token=' + c : '?auth_token=' + e.getAuthToken()), f.buildUrl(b);
                        }
                        function r() {
                            b.remove(k), g.fireLoadingStart();
                            var a = c(function () {
                                'true' === b.get(k) && (g.fireLoadingEnd(), b.remove(k), c.cancel(a));
                            }, 100);
                        }
                        n.click(function (a) {
                            a.stopPropagation(),
                                j.log("Clicked on 'Download session'"),
                                d.sessionCanBeDownloaded(m.sessionId).then(
                                    function () {
                                        p(m.sessionId);
                                    },
                                    function (a) {
                                        a.status === l.FORBIDDEN
                                            ? i.notify("Your current plan doesn't allow downloading sessions.")
                                            : h.error('Error downloading session.');
                                    }
                                );
                        });
                    },
                };
            },
        ]),
    angular.module('commonApp').directive('sessionstackDropdown', [
        function () {
            return {
                restrict: 'E',
                templateUrl: './common/templates/sessionstackDropdown.html',
                replace: !0,
                require: ['^form'],
                scope: {
                    value: '=',
                    options: '=',
                    label: '@',
                    name: '@',
                    required: '@',
                    errorMesssge: '@',
                    externalClass: '@class',
                },
                link: function (a, b, c, d) {
                    (a.form = d[0]),
                        (a.isValidatable = function () {
                            return a.form && a.name;
                        }),
                        (a.formValidator = a.isValidatable() ? a.form[a.name] : null),
                        (a.checkForErrorClass = function () {
                            var b = '';
                            return (
                                a.isValidatable() &&
                                    a.formValidator.$dirty &&
                                    a.formValidator.$invalid &&
                                    (b = 'error'),
                                b
                            );
                        });
                },
            };
        },
    ]),
    angular.module('commonApp').directive('sessionstackInput', [
        function () {
            return {
                restrict: 'E',
                templateUrl: './common/templates/sessionstackInput.html',
                replace: !0,
                require: ['^form'],
                scope: {
                    value: '=',
                    label: '@',
                    type: '@',
                    name: '@',
                    required: '@',
                    minlength: '@',
                    maxlength: '@',
                    placeholder: '@',
                    pattern: '@',
                    error: '@',
                    externalClass: '@class',
                },
                link: function (a, b, c, d) {
                    (a.form = d[0]),
                        (a.isValidatable = function () {
                            return a.form && a.name;
                        }),
                        a.pattern && (a.pattern = /$scope.pattern/i),
                        (a.formValidator = a.isValidatable() ? a.form[a.name] : null),
                        (a.showPassword = function () {
                            a.showPasswordValue = !0;
                        }),
                        (a.hidePassword = function () {
                            a.showPasswordValue = !1;
                        }),
                        (a.showSuccessIcon = function () {
                            return (
                                a.formValidator.$dirty && !a.formValidator.$invalid && a.value && 'password' !== a.type
                            );
                        }),
                        (a.showErrorIcon = function () {
                            return a.formValidator.$dirty && a.formValidator.$invalid && !a.focus;
                        }),
                        (a.showPasswordIcon = function () {
                            return !a.showErrorIcon() && 'password' === a.type && null !== a.value;
                        });
                },
            };
        },
    ]),
    angular.module('commonApp').directive('textSelector', [
        '$window',
        '$document',
        function (a, b) {
            return {
                restrict: 'A',
                link: function (c, d, e) {
                    function f() {
                        var c = a.getSelection(),
                            e = b[0].createRange();
                        e.selectNodeContents(d[0]), c.removeAllRanges(), c.addRange(e);
                    }
                    function g() {
                        var a = b[0].body.createTextRange();
                        a.moveToElementText(d[0]), a.select();
                    }
                    function h(a) {
                        d.on('click', a),
                            c.$on('$destroy', function () {
                                d.off('click', a);
                            });
                    }
                    var i = angular.isDefined(a.getSelection),
                        j = angular.isDefined(b[0].body.createTextRange);
                    i ? h(f) : j && h(g);
                },
            };
        },
    ]),
    angular.module('commonApp').directive('textTooltip', [
        '$window',
        'utils',
        function (a, b) {
            return {
                restrict: 'E',
                templateUrl: function (a, b) {
                    var c = 'common/templates/textTooltip.html';
                    return b.templateRoot ? b.templateRoot + c : c;
                },
                scope: {
                    text: '=',
                },
                link: function (a, c, d) {
                    var e = c.parent();
                    e.on('mouseenter', function () {
                        a.isVisible = b.isEllipsisActive(e[0]);
                    }),
                        e.on('mouseleave', function () {
                            a.isVisible = !1;
                        });
                },
            };
        },
    ]),
    angular.module('commonApp').directive('trialOverlay', [
        '$window',
        '$cookies',
        '$location',
        'routing',
        'auth',
        'lodash',
        'FRONTEND_URL',
        function (a, b, c, d, e, f, g) {
            return {
                restrict: 'E',
                replace: !0,
                templateUrl: function (a, b) {
                    var c = 'common/templates/trialOverlay.html';
                    return b.templateRoot ? b.templateRoot + c : c;
                },
                scope: {
                    user: '=',
                    isPlayer: '=',
                },
                link: function (e, g, h) {
                    function i() {
                        var a = c.path();
                        if (!e.user || !e.user.isTrial || m(a)) return l();
                        var b = e.user.trialDaysLeft,
                            d = o();
                        return 0 === b
                            ? k()
                            : b < f.min(p) || b > f.max(p)
                            ? void 0
                            : d
                            ? void angular.forEach(p, function (a) {
                                  if (b <= a && a < d) return j();
                              })
                            : j();
                    }
                    function j() {
                        e.trialStatus = s.ACTIVE;
                    }
                    function k() {
                        e.trialStatus = s.EXPIRED;
                    }
                    function l() {
                        e.trialStatus = null;
                    }
                    function m(a) {
                        return r.some(function (b) {
                            return a.indexOf(b) > -1;
                        });
                    }
                    function n(c) {
                        var d = new Date(),
                            e = new Date(d.getFullYear(), d.getMonth(), d.getDate() + c),
                            f = a.location.hostname;
                        b.put(q, c, {
                            path: '/',
                            expires: e,
                            domain: f,
                        });
                    }
                    function o() {
                        var a = b.get(q);
                        if (a) return parseInt(a);
                    }
                    var p = [1, 3, 7],
                        q = 'sessionstack-acknowledged-trial-days-left',
                        r = ['login', 'signup', 'billing', 'accept_invitation'],
                        s = {
                            ACTIVE: 'active',
                            EXPIRED: 'expired',
                        };
                    e.trialStatus,
                        e.$watch('user', i),
                        e.$on('$locationChangeSuccess', i),
                        (e.closeTrialDialog = function () {
                            n(e.user.trialDaysLeft), l();
                        }),
                        (e.upgradeNow = function () {
                            e.closeTrialDialog(),
                                e.isPlayer ? d.openPlatformView('billing') : d.transitionTo('organization.billing');
                        });
                },
            };
        },
    ]),
    angular.module('commonApp').filter('capitalize', [
        'lodash',
        function (a) {
            return function (b) {
                return a.capitalize(b);
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('BILLIONS', 1e9)
        .constant('MILLIONS', 1e6)
        .constant('THOUSANDS', 1e3)
        .filter('countformat', [
            'lodash',
            'BILLIONS',
            'MILLIONS',
            'THOUSANDS',
            function (a, b, c, d) {
                return function (e) {
                    if (!a.isNaN(e)) {
                        if (e >= b) {
                            var f = Math.floor(e / b);
                            return f + 'B';
                        }
                        if (e >= c) {
                            var f = Math.floor(e / c);
                            return f + 'M';
                        }
                        if (e >= d) {
                            var f = Math.floor(e / d);
                            return f + 'K';
                        }
                        return e;
                    }
                };
            },
        ]),
    angular.module('commonApp').filter('dateformat', [
        '$moment',
        function (a) {
            return function (b) {
                return a.utc(b).format('MMM Do, h:mm a');
            };
        },
    ]),
    angular.module('commonApp').filter('decodeuri', function () {
        return window.decodeURI;
    }),
    angular.module('commonApp').filter('detaileddateformat', [
        '$moment',
        'auth',
        function (a, b) {
            return function (c) {
                var d = b.getCurrentUser(),
                    e = d && d.timezoneName;
                return e ? a.utc(c).tz(e).format('MMMM Do, h:mm:ss a') : a.utc(c).format('MMMM Do, h:mm:ss a');
            };
        },
    ]),
    angular.module('commonApp').filter('lengthformat', [
        'TimeComponents',
        function (a) {
            return function (b) {
                var c = new a(b),
                    d = '';
                return (
                    c.hours > 0 && ((d += c.getHours() + ' hr'), c.getHours() > 1 && (d += 's')),
                    (c.getMinutes() > 0 || c.getHours() > 0) &&
                        (c.getHours() > 0 && (d += ' '),
                        (d += c.getMinutes() + ' min'),
                        c.getMinutes() > 1 && (d += 's')),
                    c.getSeconds() > 0 &&
                        ((c.getMinutes() > 0 || c.getHours() > 0) && (d += ' '),
                        (d += c.getSeconds() + ' sec'),
                        c.getSeconds() > 1 && (d += 's')),
                    0 === d.length && (d = '0 secs'),
                    d
                );
            };
        },
    ]),
    angular.module('commonApp').filter('momentformat', [
        'TimeComponents',
        function (a) {
            return function (b) {
                var c = new a(b),
                    d = '';
                return (
                    c.getHours() > 0 && (d += c.getHours()),
                    (c.getMinutes() > 0 || c.getHours() > 0) &&
                        (c.getHours() > 0 && ((d += ':'), c.getMinutes() <= 9 && (d += '0')), (d += c.getMinutes())),
                    c.getSeconds() >= 0 &&
                        ((d += c.getMinutes() > 0 || c.getHours() > 0 ? ':' : '0:'),
                        c.getSeconds() <= 9 && (d += '0'),
                        (d += c.getSeconds())),
                    0 === d.length && (d = '0:00'),
                    d
                );
            };
        },
    ]),
    angular.module('commonApp').filter('range', [
        'lodash',
        function (a) {
            return function (b, c) {
                return a.range(0, c, 1);
            };
        },
    ]),
    angular.module('commonApp').filter('timeformat', function () {
        function a(a, b, c) {
            var d = Math.floor(a / c),
                e = d + ' ' + b;
            return d > 1 && (e += 's'), e;
        }
        var b = 1,
            c = 60,
            d = 60 * c,
            e = 24 * d,
            f = 7 * e,
            g = 30 * e,
            h = 12 * g;
        return function (i) {
            return i >= h
                ? a(i, 'year', h)
                : i >= g
                ? a(i, 'month', g)
                : i >= f
                ? a(i, 'week', f)
                : i >= e
                ? a(i, 'day', e)
                : i >= d
                ? a(i, 'hour', d)
                : i >= c
                ? a(i, 'minute', c)
                : i >= b
                ? a(i, 'second', b)
                : void 0;
        };
    }),
    angular
        .module('commonApp')
        .constant('CLIENT_EVENTS', {
            SIGNUP_PAGE_VISITED: 'signup_page_visited',
            PROFILING_PAGE_VISITED: 'profiling_page_visited',
        })
        .factory('amplitudeManager', [
            'CLIENT_EVENTS',
            function (a) {
                function b(a) {
                    if (window.amplitude && a) {
                        var b = amplitude.getInstance(),
                            c = new amplitude.Identify();
                        b.setUserId(a.id), b.identify(c), b.logEvent('client_data_updated');
                    }
                }
                function c() {
                    e(a.SIGNUP_PAGE_VISITED);
                }
                function d() {
                    e(a.PROFILING_PAGE_VISITED);
                }
                function e(a) {
                    if (window.amplitude) {
                        var b = amplitude.getInstance();
                        b.logEvent(a);
                    }
                }
                return {
                    updateUserClientData: b,
                    trackSignupPageVisited: c,
                    trackProfilingPageVisited: d,
                };
            },
        ]),
    angular.module('commonApp').factory('analytics', [
        '$resource',
        '$q',
        'promise',
        'restSettings',
        'ANALYTICS_EVENT_TYPES',
        function (a, b, c, d, e) {
            function f(a, b, d, e, f) {
                return c.execute(o.save, {
                    userId: a,
                    eventType: b,
                    eventProperties: d,
                    userProperties: e,
                    time: f,
                });
            }
            function g(a, b, d, f) {
                return c.execute(
                    p.save,
                    {
                        session_id: b,
                        access_token: d,
                    },
                    {
                        userId: a,
                        eventType: e.SESSION_OPENED,
                        eventProperties: {
                            session_id: b,
                            access_token: d,
                            source: f,
                        },
                    }
                );
            }
            function h(a, b) {
                return c.execute(q.save, {
                    userId: a,
                    eventType: e.LIVE_SESSION_OPENED,
                    eventProperties: {
                        session_id: b,
                    },
                });
            }
            function i(a, b) {
                return c.execute(q.save, {
                    userId: a,
                    eventType: e.LIVE_SESSION_STOPPED,
                    eventProperties: {
                        session_id: b,
                    },
                });
            }
            function j(a, b, c) {
                return f(a, e.PROJECT_OPENED, {
                    project_id: b,
                    project_name: c,
                });
            }
            function k(a, b, c) {
                return f(a, e.PROJECT_SETTINGS_OPENED, {
                    project_id: b,
                    project_name: c,
                });
            }
            var l = d.buildUrl('analytics'),
                m = d.buildUrl('analytics/sessions/:session_id'),
                n = d.buildUrl('analytics/live_sessions'),
                o = a(l),
                p = a(m),
                q = a(n);
            return {
                trackEvent: f,
                trackSessionOpened: g,
                trackLiveSessionOpened: h,
                trackLiveSessionStopped: i,
                trackProjectOpened: j,
                trackProjectSettingsOpened: k,
            };
        },
    ]),
    angular.module('commonApp').factory('auth', [
        '$q',
        '$http',
        '$resource',
        '$rootScope',
        'restSettings',
        'tokenManager',
        'promise',
        function (a, b, c, d, e, f, g) {
            function h(c, d) {
                var e = a.defer(),
                    g = f.generateBasicToken(c + ':' + d),
                    h = {
                        headers: {
                            Authorization: g,
                        },
                    };
                return (
                    b
                        .get(L, h)
                        .success(function (a, b, c, d) {
                            z(a), e.resolve(a);
                        })
                        .error(function (a, b, c, d) {
                            j(),
                                e.reject({
                                    data: a,
                                    status: b,
                                });
                        }),
                    e.promise
                );
            }
            function i(a) {
                return g.execute(N.get, {
                    organization: a,
                });
            }
            function j() {
                (I = null), f.clearAuthToken(), t();
            }
            function k() {
                var b = a.defer();
                return (
                    I
                        ? b.resolve(I)
                        : r()
                        ? g.execute(R.get).then(
                              function (a) {
                                  l(a),
                                      s(a, {
                                          hasLoggedFromLogin: !1,
                                      }),
                                      b.resolve(a);
                              },
                              function (a) {
                                  b.reject(a), 403 === a.status && j();
                              }
                          )
                        : b.reject(),
                    b.promise
                );
            }
            function l(a) {
                I = a;
            }
            function m() {
                I = null;
            }
            function n() {
                return I;
            }
            function o() {
                return !!I;
            }
            function p() {
                return f.getAuthToken();
            }
            function q() {
                return f.getAccessToken();
            }
            function r() {
                return f.hasAuthToken();
            }
            function s(a, b) {
                d.$broadcast(J, a, b);
            }
            function t(a) {
                d.$broadcast(K, a);
            }
            function u(a) {
                d.$on(J, a);
            }
            function v(a) {
                d.$on(K, a);
            }
            function w(a) {
                return g.execute(T.save, {
                    email: a,
                });
            }
            function x(a) {
                return g.execute(T.get, {
                    token: a,
                });
            }
            function y(a, b, c) {
                return g.execute(
                    T.update,
                    {
                        token: a,
                    },
                    {
                        newPassword: b,
                        passwordConfirmation: c,
                    }
                );
            }
            function z(a) {
                f.setAuthToken(a.token),
                    l(a),
                    s(a, {
                        hasLoggedFromLogin: !0,
                    });
            }
            function A(a, b) {
                return g.execute(
                    V.save,
                    {
                        token: b,
                    },
                    {
                        email: a.email,
                        password: a.password,
                        firstName: a.firstName,
                        lastName: a.lastName,
                        organizationName: a.organizationName,
                    }
                );
            }
            function B(a, b, c) {
                return g.execute(X.save, {
                    email: a.email,
                    password: a.password,
                    firstName: a.firstName,
                    lastName: a.lastName,
                    phoneNumber: a.phoneNumber,
                    organizationName: a.organizationName,
                    organizationRole: a.organizationRole,
                    supportTeamSize: a.supportTeamSize,
                    requestedDemo: a.requestedDemo,
                    referrer: b,
                    redeem: c,
                    organizationUrl: a.organizationUrl,
                });
            }
            function C(a, b, c, d) {
                return g.execute(R.update, {
                    email: a,
                    firstName: b,
                    lastName: c,
                    organizationName: d,
                });
            }
            function D(a) {
                return g.execute(Z.save, {
                    email: a.email,
                    firstName: a.firstName,
                    lastName: a.lastName,
                    password: a.password,
                    phoneNumber: a.phoneNumber,
                    organizationRole: a.organizationRole,
                    organizationName: a.organizationName,
                    supportTeamSize: a.supportTeamSize,
                });
            }
            function E(a) {
                return g.execute(_.save, {
                    email: a.email,
                });
            }
            function F(a) {
                return g.execute(P.get, {
                    organization: a,
                });
            }
            function G(a, b) {
                return g.execute(
                    P.save,
                    {
                        organization: a,
                    },
                    {
                        authMethod: b.authMethod,
                        entityId: b.entityId,
                        ssoURL: b.ssoURL,
                        certificateFingerprint: b.certificateFingerprint,
                    }
                );
            }
            function H(a) {
                return g.execute(ba.save, {
                    organizationUrl: a,
                });
            }
            var I = null,
                J = 'loggedIn',
                K = 'loggedOut',
                L = e.buildUrl('login'),
                M = e.buildUrl('auth_method/:organization'),
                N = c(M),
                O = e.buildUrl('auth_settings/:organization'),
                P = c(O),
                Q = e.buildUrl('me'),
                R = c(Q, null, {
                    update: {
                        method: 'PUT',
                    },
                }),
                S = e.buildUrl('password_reset/:token'),
                T = c(S, null, {
                    update: {
                        method: 'PUT',
                    },
                }),
                U = e.buildUrl('accept_invitation/:token'),
                V = c(U),
                W = e.buildUrl('register/trial'),
                X = c(W),
                Y = e.buildUrl('register/validation/user'),
                Z = c(Y),
                $ = e.buildUrl('register/validation/email'),
                _ = c($),
                aa = e.buildUrl('organization_url'),
                ba = c(aa);
            return {
                login: h,
                getAuthMethod: i,
                logout: j,
                isCurrentUserLoaded: o,
                isLoggedIn: o,
                loadCurrentUser: k,
                getCurrentUser: n,
                clearCurrentUser: m,
                getAuthToken: p,
                hasAuthToken: r,
                getAccessToken: q,
                onLoggedIn: u,
                onLoggedOut: v,
                resetPassword: w,
                getPasswordResetEmail: x,
                setNewPassword: y,
                updateProfile: C,
                onAuthenticate: z,
                acceptInvitation: A,
                register: B,
                validateUser: D,
                validateEmail: E,
                getAuthSettings: F,
                saveAuthSettings: G,
                setUserOrganizationUrl: H,
            };
        },
    ]),
    angular.module('commonApp').factory('authInterceptor', [
        'tokenManager',
        function (a) {
            return {
                request: function (b) {
                    if (b && b.headers && b.headers.Authorization) return b;
                    var c = a.getAuthToken();
                    if (c) {
                        var d = a.generateBasicToken(c + ':');
                        b.headers.Authorization = d;
                    }
                    return b;
                },
            };
        },
    ]),
    angular.module('commonApp').factory('confirmationDialog', [
        '$mdDialog',
        function (a) {
            function b(b) {
                return a.show(
                    a
                        .confirm()
                        .title(b.title)
                        .htmlContent(b.message)
                        .ariaLabel('Confirmation dialog')
                        .ok('Yes')
                        .cancel('No')
                );
            }
            function c(b) {
                a.prompt()
                    .title(b.title)
                    .placeholder(b.placeholder)
                    .ariaLabel(b.title)
                    .ok(b.okLabel)
                    .cancel(b.cancelLabel);
                return a.show(confirm);
            }
            return {
                open: b,
                openPromptDialog: c,
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('COOKIE_LISTENER_INTERVAL', 1e3)
        .factory('CookieChangeListener', [
            '$cookies',
            '$interval',
            'utils',
            'COOKIE_LISTENER_INTERVAL',
            function (a, b, c, d) {
                var e = function (a, b) {
                    var d = this;
                    (d._cookieName = a), (d._callback = c.isFunction(b) ? b : c.noop);
                };
                return (
                    (e.prototype.listen = function () {
                        var c = this;
                        (c._previousValue = a.get(c._cookieName)),
                            c._callback(c._previousValue),
                            (c._listener = b(function () {
                                var b = a.get(c._cookieName);
                                b !== c._previousValue && ((c._previousValue = b), c._callback(c._previousValue));
                            }, d));
                    }),
                    (e.prototype.cancel = function () {
                        self._listener && b.cancel(self._listener);
                    }),
                    e
                );
            },
        ]);
var app = angular.module('commonApp');
app.factory('$exceptionHandler', [
    '$log',
    '$injector',
    function (a, b) {
        var c;
        return function (d, e) {
            (c = c || b.get('sessionstackManager')), c.log(d), e && c.log('Error cause: ' + e), a.error(d, e);
        };
    },
]),
    angular.module('commonApp').factory('featureFlags', [
        '$resource',
        'restSettings',
        'promise',
        'utils',
        'tokenManager',
        function (a, b, c, d, e) {
            function f(a) {
                var b = h({
                    id: a,
                });
                return c.execute(j.get, b);
            }
            function g(a) {
                return c.execute(j.get, {
                    id: a,
                });
            }
            function h(a) {
                var b = e.getAccessToken();
                return b && angular.isObject(a)
                    ? d.mergeObjects(a, {
                          access_token: b,
                      })
                    : a;
            }
            var i = b.buildUrl('features/:id'),
                j = a(i);
            return {
                getSessionFeatureFlags: f,
                getWebsiteFeatureFlags: g,
            };
        },
    ]),
    angular.module('commonApp').factory('googleTagManager', [
        'utils',
        function (a) {
            function b() {
                e('formSubmitted', 'registration');
            }
            function c() {
                f('/profiling');
            }
            function d() {
                f('/signup');
            }
            function e(a, b) {
                g &&
                    window.dataLayer.push({
                        event: a,
                        formName: b,
                    });
            }
            function f(a) {
                g &&
                    window.dataLayer.push({
                        event: 'VirtualPageview',
                        virtualPageURL: a,
                    });
            }
            var g = a.isArray(window.dataLayer);
            return {
                trackRegistration: b,
                trackSignupPageVisited: d,
                trackProfilingPageVisited: c,
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('APP_ID', 'h9g5kdue')
        .factory('intercomManager', [
            'utils',
            'APP_ID',
            function (a, b) {
                function c() {}
                function d(a) {
                    j && window.Intercom('trackEvent', a);
                }
                function e(a) {
                    if (j)
                        if (a) {
                            var b = g(a);
                            window.Intercom('update', b);
                        } else window.Intercom('update');
                }
                function f() {
                    j && window.Intercom('shutdown');
                }
                function g(a) {
                    return {
                        name: a.firstName + ' ' + a.lastName,
                        email: a.email,
                        created_at: a.created,
                        verification_token: a.verificationToken,
                        special_offer: a.specialOffer,
                        is_trial: a.isTrial,
                        organization_role: a.organizationRole,
                    };
                }
                function h(a) {
                    j && window.Intercom('showNewMessage', a);
                }
                var i = {
                        REACHED_50_PERCENT: '50%-daily-sessions-reached',
                        REACHED_90_PERCENT: '90%-daily-sessions-reached',
                    },
                    j = a.isFunction(window.Intercom);
                return {
                    boot: c,
                    update: e,
                    shutDown: f,
                    trackEvent: d,
                    showNewMessage: h,
                    EVENTS: i,
                };
            },
        ]),
    angular.module('commonApp').factory('loadingInterceptor', [
        '$q',
        'loadingStatus',
        function (a, b) {
            function c() {
                0 === e && b.fireLoadingStart(), e++;
            }
            function d() {
                e > 0 && e--, 0 === e && b.fireLoadingEnd();
            }
            var e = 0;
            return {
                request: function (a) {
                    return a.shouldHideLoadingAnimation || c(), a;
                },
                requestError: function (b) {
                    return d(), a.reject(b);
                },
                response: function (a) {
                    return a.config.shouldHideLoadingAnimation || d(), a;
                },
                responseError: function (b) {
                    return d(), a.reject(b);
                },
            };
        },
    ]),
    angular.module('commonApp').factory('loadingStatus', [
        '$rootScope',
        function (a) {
            function b() {
                a.$broadcast(f);
            }
            function c() {
                a.$broadcast(g);
            }
            function d(b) {
                a.$on(f, b);
            }
            function e(b) {
                a.$on(g, b);
            }
            var f = 'start',
                g = 'end';
            return {
                fireLoadingStart: b,
                fireLoadingEnd: c,
                onLoadingStart: d,
                onLoadingEnd: e,
            };
        },
    ]),
    angular.module('commonApp').factory('log', [
        '$resource',
        'restSettings',
        'promise',
        function (a, b, c) {
            function d(a, b) {
                return c.execute(u.get, {
                    website_id: a,
                    skip: b.skip,
                    limit: b.limit,
                    search: b.search || void 0,
                    sort: b.sort || void 0,
                    order: b.order || void 0,
                    period: b.period,
                    levels: b.levels,
                });
            }
            function e(a) {
                return c.execute(q.get, {
                    website_id: a.websiteId,
                    level: a.level,
                    message: a.message,
                    fromDate: a.fromDate,
                });
            }
            function f(a) {
                return c.execute(r.get, {
                    website_id: a.websiteId,
                    level: a.level,
                    message: a.message,
                    fromDate: a.fromDate,
                });
            }
            function g(a) {
                return c.execute(s.get, {
                    website_id: a.websiteId,
                    level: a.level,
                    message: encodeURIComponent(a.message),
                    fromDate: a.fromDate,
                    logId: a.logId,
                    logTime: a.logTime,
                });
            }
            function h(a) {
                return c.execute(t.get, {
                    website_id: a.websiteId,
                    level: a.level,
                    message: encodeURIComponent(a.message),
                    fromDate: a.fromDate,
                    logId: a.logId,
                    logTime: a.logTime,
                });
            }
            function i(a, b) {
                return c.execute(p['delete'], {
                    website_id: a,
                    log_id: b,
                });
            }
            var j = b.buildUrl('websites/:website_id/logs/:log_id'),
                k = b.buildUrl('websites/:website_id/logs/newest'),
                l = b.buildUrl('websites/:website_id/logs/oldest'),
                m = b.buildUrl('websites/:website_id/logs/:level/:message/:logId/next'),
                n = b.buildUrl('websites/:website_id/logs/:level/:message/:logId/previous'),
                o = b.buildUrl('websites/:website_id/logs/aggregated'),
                p = a(j),
                q = a(k),
                r = a(l),
                s = a(m),
                t = a(n),
                u = a(o);
            return {
                getAggregatedLogs: d,
                getNewestLog: e,
                getOldestLog: f,
                getNextLog: g,
                getPreviousLog: h,
                deleteLog: i,
            };
        },
    ]),
    angular.module('commonApp').factory('logTypes', [
        'LOG_LEVEL',
        function (a) {
            function b(b) {
                switch (b) {
                    case a.DEBUG:
                        return c('info', 'ion-bug', '#2a6ce7');
                    case a.ERROR:
                        return c('danger', 'ion-android-alert', '#ff0944');
                    case a.WARN:
                        return c('warning', 'ion-alert-circled', '#f0ad4e');
                    default:
                        return c('info', 'ion-information-circled', '#2a6ce7');
                }
            }
            function c(a, b, c) {
                return {
                    class: 'alert-' + a,
                    icon: b,
                    color: c,
                };
            }
            return {
                getLogType: b,
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('URL_PROTOCOL', {
            HTTP: 'http://',
            HTTPS: 'https://',
        })
        .factory('navigation', [
            '$window',
            '$location',
            'FRONTEND_URL',
            'URL_PROTOCOL',
            function (a, b, c, d) {
                function e() {
                    return c + 'player';
                }
                function f(b, c, d) {
                    var e = i({
                        sessionId: b,
                        forceHttp: c,
                    });
                    (e += j({
                        source: d,
                    })),
                        a.open(e);
                }
                function g(b, c) {
                    var d = i({
                        sessionId: b,
                        forceHttp: c,
                    });
                    (d += j({
                        play_live: !0,
                        source: 'online_users_dashboard',
                    })),
                        a.open(d);
                }
                function h(b, c, d) {
                    var e = k(b, c, d);
                    (e += j({
                        source: 'events_and_errors_dashboard',
                    })),
                        a.open(e);
                }
                function i(a) {
                    var b = e() + '/#/sessions/' + a.sessionId;
                    return a.forceHttp && b.startsWith(d.HTTPS) && (b = b.replace(d.HTTPS, d.HTTP)), b;
                }
                function j(a) {
                    var b = '',
                        c = 0;
                    for (var d in a) (b += 0 === c ? '?' : '&'), (b += d + '=' + a[d]), c++;
                    return b;
                }
                function k(a, b, c) {
                    var d = i({
                        sessionId: a,
                        forceHttp: c,
                    });
                    return (d += '/logs/' + b);
                }
                return {
                    openSessionInNewWindow: f,
                    openLiveSessionInNewWindow: g,
                    openLogInNewWindow: h,
                };
            },
        ]),
    angular.module('commonApp').factory('notification', [
        'toastrConfig',
        'toastr',
        function (a, b) {
            function c(a, c) {
                b.success(a, c);
            }
            function d(a, c) {
                b.info(a, c);
            }
            function e(a, c) {
                b.warning(a, c);
            }
            function f(a, c) {
                b.error(a, c);
            }
            return (
                angular.extend(a, {
                    positionClass: 'toast-top-right',
                    closeButton: !0,
                    autoDismiss: !0,
                    maxOpened: 5,
                }),
                {
                    success: c,
                    info: d,
                    warning: e,
                    error: f,
                }
            );
        },
    ]),
    angular
        .module('commonApp')
        .constant('API_KEY', '78c1a6d1-791d-4d7c-4ec7-5cfa38401c04')
        .factory('pendoManager', [
            'utils',
            'API_KEY',
            function (a, b) {
                function c(c) {
                    window.pendo &&
                        a.isFunction(window.pendo.initialize) &&
                        window.pendo.initialize({
                            apiKey: b,
                            visitor: {
                                id: c.id,
                                email: c.email,
                                role: c.role,
                            },
                        });
                }
                return {
                    initialize: c,
                };
            },
        ]),
    angular.module('commonApp').factory('planLimitationNotification', [
        'notification',
        function (a) {
            function b(b) {
                a.info(b, 'Upgrade your plan');
            }
            function c() {
                a.info('Upgrade to unlock it.', 'This is a premium feature.');
            }
            return {
                notify: b,
                notifyForPremiumFeature: c,
            };
        },
    ]),
    angular.module('commonApp').factory('progressInterceptor', [
        'requestProgressHandlersManager',
        function (a) {
            return {
                request: function (b) {
                    function c(a) {
                        var c = b.eventHandlers.progress;
                        b.eventHandlers.progress = function (b) {
                            if (b.total) {
                                var d = {
                                    minValue: 0,
                                    maxValue: b.total,
                                    currentValue: b.loaded,
                                    isLoading: b.loaded !== b.total,
                                };
                                angular.forEach(a, function (a) {
                                    angular.isFunction(a) && a(d);
                                });
                            }
                            angular.isFunction(c) && c.apply(this, arguments);
                        };
                    }
                    b.eventHandlers = b.eventHandlers || {};
                    var d = a.getMatchingProgressHandlers(b.url);
                    return c(d), b;
                },
            };
        },
    ]),
    angular.module('commonApp').factory('promise', [
        '$q',
        function (a) {
            function b(b) {
                function c() {
                    e.resolve.apply(this, arguments);
                }
                function d() {
                    e.reject.apply(this, arguments);
                }
                var e = a.defer(),
                    f = Array.prototype.slice.call(arguments, 1);
                return f.push(c, d), b.apply(this, f), e.promise;
            }
            return {
                execute: b,
            };
        },
    ]),
    angular.module('commonApp').factory('requestProgressHandlersManager', function () {
        function a(a, b) {
            a instanceof RegExp &&
                c.push({
                    urlExpression: a,
                    progressHandler: b,
                });
        }
        function b(a) {
            var b = [];
            return (
                angular.forEach(c, function (c) {
                    var d = c.urlExpression,
                        e = c.progressHandler;
                    d.test(a) && b.push(e);
                }),
                b
            );
        }
        var c = [];
        return {
            registerProgressHandler: a,
            getMatchingProgressHandlers: b,
        };
    }),
    angular.module('commonApp').factory('restSettings', [
        'SERVER_URL',
        function (a) {
            function b(b) {
                return a + b;
            }
            function c(a, b, c) {
                var d = '{' + b + '}';
                return a.replace(d, c);
            }
            return {
                buildUrl: b,
                formatUrl: c,
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('ORGANIZATION_COOKIE_KEY', 'sessionstack-organization')
        .factory('routing', [
            '$cookies',
            '$state',
            '$window',
            'ORGANIZATION_COOKIE_KEY',
            'FRONTEND_URL',
            function (a, b, c, d, e) {
                function f(b) {
                    a.put(d, b);
                }
                function g() {
                    a.remove(d);
                }
                function h() {
                    return a.get(d);
                }
                function i(c, e) {
                    (e = e || {}),
                        (e.organization = a.get(d)),
                        b.transitionTo(c, e, {
                            location: !0,
                        });
                }
                function j(a) {
                    var b = e + '#/',
                        d = h();
                    d && (b += d + '/'), c.open(b + a);
                }
                return {
                    setOrganization: f,
                    getOrganization: h,
                    clearOrganization: g,
                    transitionTo: i,
                    openPlatformView: j,
                };
            },
        ]),
    angular.module('commonApp').factory('session', [
        '$resource',
        '$q',
        'restSettings',
        'promise',
        'tokenManager',
        'utils',
        function (a, b, c, d, e, f) {
            function g(a) {
                var b = l({
                    session_id: a,
                });
                return d.execute(A.get, b);
            }
            function h(a, b) {
                var c = l({
                    session_id: a,
                    log_id: b,
                });
                return d.execute(B.get, c);
            }
            function i(a) {
                return d.execute(C.get, {
                    session_id: a,
                });
            }
            function j(a, b) {
                return d.execute(D.get, {
                    session_id: a,
                    skip: b.skip,
                    limit: b.limit,
                    search: b.search || void 0,
                });
            }
            function k(a, b) {
                var c = l({
                    session_id: a,
                    events_timestamp: b.eventsTimestamp,
                    events_index: b.eventsIndex,
                });
                return d.execute(G.get, c);
            }
            function l(a) {
                var b = e.getAccessToken();
                return b && angular.isObject(a)
                    ? f.mergeObjects(a, {
                          access_token: b,
                      })
                    : a;
            }
            function m(a, b) {
                return d.execute(z.get, {
                    website_id: a,
                    skip: b.skip,
                    limit: b.limit,
                    search: b.search || void 0,
                    sort: b.sort || void 0,
                    order: b.order || void 0,
                    start_date: b.startDate || void 0,
                    end_date: b.endDate || void 0,
                    active_sessions: b.activeSessions,
                });
            }
            function n(a, b) {
                return o(a, [b]);
            }
            function o(a, b) {
                return d.execute(z['delete'], {
                    website_id: a,
                    session_ids: b,
                });
            }
            function p(a) {
                var b = l({
                    session_id: a,
                });
                return d.execute(E.get, b);
            }
            function q(a) {
                return d.execute(F.get, {
                    session_id: a,
                });
            }
            var r = c.buildUrl('websites/:website_id/sessions'),
                s = c.buildUrl('sessions/:session_id'),
                t = c.buildUrl('sessions/:session_id/logs/:log_id'),
                u = c.buildUrl('sessions/:session_id/details'),
                v = c.buildUrl('sessions/:session_id/logs'),
                w = c.buildUrl('sessions/:session_id/canbedownloaded'),
                x = c.buildUrl('sessions/:session_id/activities'),
                y = c.buildUrl('sessions/:session_id/activities/count'),
                z = a(r),
                A = a(s),
                B = a(t),
                C = a(u),
                D = a(v),
                E = a(w),
                F = a(y),
                G = a(x, null, {
                    get: {
                        shouldHideLoadingAnimation: !0,
                    },
                });
            return {
                getSession: g,
                getSessionLog: h,
                getSessionDetails: i,
                getSessionLogs: j,
                getSessions: m,
                deleteSession: n,
                deleteSessions: o,
                sessionCanBeDownloaded: p,
                getActivities: k,
                getActivitiesCount: q,
            };
        },
    ]),
    angular.module('commonApp').factory('sessionDetailsModal', [
        '$mdDialog',
        function (a) {
            function b(b) {
                a.show({
                    templateUrl: 'templates/sessionDetailsModal.html',
                    controller: 'SessionDetailsController',
                    locals: {
                        sessionData: b,
                    },
                });
            }
            return {
                open: b,
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('MILLISECONDS_IN_A_SECOND', 1e3)
        .factory('sessionstackManager', [
            'utils',
            'LOG_LEVEL',
            'MILLISECONDS_IN_A_SECOND',
            function (a, b, c) {
                function d(a, b) {
                    g && window.sessionstack('log', a, b);
                }
                function e(a, c) {
                    (c = c || {}), (c.level = b.WARN), d(a, c);
                }
                function f(a) {
                    if (g && a) {
                        var b = a.firstName + ' ' + a.lastName,
                            d = new Date(a.created * c).toString();
                        window.sessionstack('identify', {
                            userId: a.id,
                            displayName: b,
                            email: a.email,
                            createdAt: d,
                            hasActivePlan: a.hasActivePlan,
                            role: a.role,
                            isVerified: a.isVerified,
                        });
                    }
                }
                var g = a.isFunction(window.sessionstack);
                return {
                    log: d,
                    identify: f,
                    warn: e,
                };
            },
        ]),
    angular.module('commonApp').factory('settings', [
        'localStorageService',
        function (a) {
            function b(b, c) {
                var d = a.get(b);
                return null === d || void 0 === d ? c : d;
            }
            function c(b, c) {
                return a.set(b, c);
            }
            function d(b) {
                return a.remove(b);
            }
            function e(b, c, d, e) {
                return a.bind(b, c, d, e);
            }
            return {
                get: b,
                set: c,
                remove: d,
                bind: e,
            };
        },
    ]),
    angular.module('commonApp').factory('TimeComponents', function () {
        var a = function (a) {
            var b = Math.floor(a / 1e3);
            (this.hours = Math.floor(b / 3600)),
                (this.minutes = Math.floor((b - 3600 * this.hours) / 60)),
                (this.seconds = Math.round(b - 3600 * this.hours - 60 * this.minutes));
        };
        return (
            (a.prototype = {
                getHours: function () {
                    return this.hours;
                },
                getMinutes: function () {
                    return this.minutes;
                },
                getSeconds: function () {
                    return this.seconds;
                },
            }),
            a
        );
    }),
    angular.module('commonApp').factory('tokenManager', [
        '$base64',
        '$cookies',
        '$location',
        'utils',
        'BUILD_ENV',
        function (a, b, c, d, e) {
            function f(a) {
                var c = new Date(),
                    d = new Date(c.getFullYear() + 1, c.getMonth(), c.getDate());
                b.put(q, a, {
                    expires: d,
                });
            }
            function g() {
                var a = c.search().auth_token;
                return (
                    a
                        ? b.put(q, a, {
                              path: '/',
                          })
                        : (a = b.get(q)),
                    a
                );
            }
            function h() {
                return (p = c.search().access_token);
            }
            function i(a) {
                m(), (o = a), f(a);
            }
            function j() {
                return o ? o : g();
            }
            function k() {
                return p ? p : h();
            }
            function l() {
                var a = j();
                return !!a;
            }
            function m() {
                (o = null), b.remove(q), !e.IS_DEV && e.IS_SAAS && d.removeCookieByName(q);
            }
            function n(b) {
                var c = a.encode(b);
                return 'Basic ' + c;
            }
            var o,
                p,
                q = 'authToken';
            return {
                setAuthToken: i,
                getAuthToken: j,
                getAccessToken: k,
                hasAuthToken: l,
                clearAuthToken: m,
                generateBasicToken: n,
            };
        },
    ]),
    angular.module('commonApp').factory('userIdentityService', [
        'lodash',
        'utils',
        function (a, b) {
            function c(c) {
                return c
                    ? a.map(c, function (c) {
                          var d = a.lowerCase(c.key);
                          return {
                              label: a.upperFirst(d),
                              value: c.value,
                              isLink: b.isAbsoluteUrl(c.value),
                          };
                      })
                    : [];
            }
            return {
                formatCustomFields: c,
            };
        },
    ]),
    angular
        .module('commonApp')
        .constant('IS_ABSOLUTE_URL', /^(?:[a-z]+:)?\/\//i)
        .constant('WHITESPACE_REGEX', /^\s*$/)
        .constant('MILLISECONDS_IN_SECOND', 1e3)
        .factory('utils', [
            '$timeout',
            '$location',
            '$document',
            '$window',
            'lodash',
            'IS_ABSOLUTE_URL',
            'MILLISECONDS_IN_SECOND',
            'WHITESPACE_REGEX',
            function (a, b, c, d, e, f, g, h) {
                function i() {
                    var a = [{}];
                    return (
                        angular.forEach(arguments, function (b) {
                            angular.isObject(b) && a.push(b);
                        }),
                        angular.extend.apply(null, a)
                    );
                }
                function j(a) {
                    return i({}, a);
                }
                function k(a) {
                    return e.clone(a);
                }
                function l() {
                    var a = e([]),
                        b = [];
                    return (
                        angular.forEach(arguments, function (a) {
                            x(a) && b.push(a);
                        }),
                        a.concat.apply(a, b).value()
                    );
                }
                function m(a) {
                    if (n(a)) {
                        var b = document.createElement('a');
                        return (b.href = a), b.protocol.replace(':', '');
                    }
                }
                function n(a) {
                    return f.test(a);
                }
                function o(a, b) {
                    var c = angular.element('<iframe class="ng-hide"></iframe>');
                    angular.element('body').append(c);
                    var d = c[0].contentDocument;
                    angular.element('head', d).append('<base href="' + a + '">'),
                        angular.element('body', d).append('<a href="' + b + '"></a>');
                    var e = angular.element('a', d)[0];
                    return angular.element(c).remove(), e.href;
                }
                function p(a, b, c) {
                    var d = '<' + a;
                    return (
                        x(b) &&
                            angular.forEach(b, function (a) {
                                d += ' ' + a.name + '="' + a.value + '"';
                            }),
                        (d += c ? '/>' : '></' + a + '>')
                    );
                }
                function q(a, b) {
                    return (a = e.trim(a)), b > 1 && (a += 's'), a;
                }
                function r(a) {
                    var b = '?';
                    return (
                        angular.forEach(a, function (a, c) {
                            b += c + '=' + a + '&';
                        }),
                        e.trimEnd(b, '&')
                    );
                }
                function s(a) {
                    return t(a) || null === a;
                }
                function t(a) {
                    return angular.isUndefined(a);
                }
                function u(a) {
                    return !t(a);
                }
                function v(a) {
                    return angular.isString(a);
                }
                function w(a) {
                    return angular.isFunction(a);
                }
                function x(a) {
                    return angular.isArray(a);
                }
                function y(a) {
                    return angular.isNumber(a);
                }
                function z(a) {
                    var c = b.search()[a];
                    try {
                        return JSON.parse(c);
                    } catch (d) {
                        return c;
                    }
                }
                function A() {
                    angular.forEach.apply(angular, arguments);
                }
                function B(a, b) {
                    return !!x(b) && b.indexOf(a) >= 0;
                }
                function C(a, b) {
                    return a.join(b);
                }
                function D(a) {
                    return a.slice().reverse();
                }
                function E(a) {
                    var b = c[0];
                    b.cookie = a + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                }
                function F(a) {
                    return a / g;
                }
                function G(a, b) {
                    return e.isEqual(a, b);
                }
                function H() {
                    var a = c[0];
                    return a.referrer;
                }
                function I() {
                    return !!d.navigator.userAgent.match(/Trident/g) || !!d.navigator.userAgent.match(/MSIE/g);
                }
                function J() {
                    var a = d.navigator.userAgent;
                    return !!a.match(/Edge/g) || !!a.match(/MSIE/g);
                }
                function K(a) {
                    if (a) {
                        for (var b = a.parentNode, c = a; b; ) (c = b), (b = b.parentNode);
                        return c;
                    }
                }
                function L(a) {
                    return !!a && a.scrollWidth > a.clientWidth;
                }
                function M(a, b, c) {
                    if (!a && !b) return !1;
                    if (!a || !b) return !0;
                    var d = N(a, c),
                        e = N(b, c);
                    return !G(d, e);
                }
                function N(a, b) {
                    var c = k(a);
                    return (
                        delete c.details.id,
                        {
                            time: b ? b(c.time) : c.time,
                            type: c.type,
                            details: c.details,
                        }
                    );
                }
                function O(a, b) {
                    if (!a) return !1;
                    var c = a.matches || a.msMatchesSelector || a.webkitMatchesSelector;
                    return !!c && c.call(a, b);
                }
                function P(a) {
                    var b = a.parentElement;
                    if (b) return b;
                    var c = w(a.getRootNode) ? a.getRootNode().host : null;
                    return c ? c : a.ownerDocument.defaultView.frameElement;
                }
                function Q(a) {
                    return h.test(a);
                }
                function R(a, b) {
                    var c = !!a.host;
                    if (void 0 === a.adoptedStyleSheets) {
                        var d = c ? a : a.head,
                            e = 'ss-adopted-styles';
                        return (
                            angular
                                .element(d)
                                .find('.' + e)
                                .remove(),
                            void angular.element(d).append('<style class=' + e + '>' + b + '</style>')
                        );
                    }
                    if ('' === b) return void (a.adoptedStyleSheets = []);
                    var f = c ? new a.ownerDocument.defaultView.CSSStyleSheet() : new a.defaultView.CSSStyleSheet();
                    f.replaceSync(b), (a.adoptedStyleSheets = [f]);
                }
                function S(a) {
                    var b = '(\\d+(?:px|em|%)|auto|inherit|initial|unset)',
                        c = new RegExp('inset:\\s*' + b + '\\s*;'),
                        d = new RegExp('inset:\\s*' + b + '\\s*' + b + ';'),
                        e = new RegExp('inset:\\s*' + b + '\\s*' + b + '\\s*' + b + ';'),
                        f = new RegExp('inset:\\s*' + b + '\\s*' + b + '\\s*' + b + '\\s*' + b + ';');
                    return (
                        (a = a.replace(c, 'top: $1; left: $1; right: $1; bottom: $1;')),
                        (a = a.replace(d, 'top: $1; left: $2; right: $2; bottom: $1;')),
                        (a = a.replace(e, 'top: $1; left: $2; right: $2; bottom: $3')),
                        (a = a.replace(f, 'top: $1; left: $2; right: $3; bottom: $4;'))
                    );
                }
                return {
                    mergeObjects: i,
                    cloneObject: j,
                    shallowClone: k,
                    concatenateArrays: l,
                    isAbsoluteUrl: n,
                    getUrlProtocol: m,
                    evaluateAbsoluteUrl: o,
                    buildHtmlString: p,
                    pluralize: q,
                    getQueryString: r,
                    isNullOrUndefined: s,
                    isUndefined: t,
                    isDefined: u,
                    isString: v,
                    isFunction: w,
                    isArray: x,
                    forEach: A,
                    inArray: B,
                    isNumber: y,
                    getQueryParameter: z,
                    reverse: D,
                    join: C,
                    removeCookieByName: E,
                    millisecondsToSeconds: F,
                    areObjectsEqual: G,
                    noop: angular.noop,
                    getReferrer: H,
                    isBrowserIE: I,
                    isBrowserNotSupported: J,
                    getTopParentOfNode: K,
                    isEllipsisActive: L,
                    isDifferentActivity: M,
                    matchesSelector: O,
                    getParentElement: P,
                    isWhitespaceString: Q,
                    replaceInsetStyleRule: S,
                    addAdoptedStyleSheets: R,
                };
            },
        ]),
    angular.module('commonApp').factory('website', [
        '$q',
        '$resource',
        'restSettings',
        'promise',
        function (a, b, c, d) {
            function e(a) {
                return d.execute(O.get, {
                    id: a,
                });
            }
            function f() {
                return d.execute(M.get);
            }
            function g(a) {
                return d.execute(I.save, a);
            }
            function h(a, b) {
                return d.execute(
                    I.update,
                    {
                        id: a,
                    },
                    b
                );
            }
            function i(a, b) {
                return d.execute(
                    J.update,
                    {
                        id: a,
                    },
                    b
                );
            }
            function j(a) {
                return d.execute(J.get, {
                    id: a,
                });
            }
            function k(a, b) {
                return d.execute(
                    K.update,
                    {
                        id: a,
                    },
                    b
                );
            }
            function l(a, b) {
                return d.execute(
                    L.update,
                    {
                        id: a,
                    },
                    b
                );
            }
            function m(a) {
                return d.execute(K.get, {
                    id: a,
                });
            }
            function n(a) {
                return d.execute(L.get, {
                    id: a,
                });
            }
            function o(a) {
                return d.execute(I.get, {
                    id: a,
                });
            }
            function p(a) {
                return d.execute(N.get, {
                    id: a,
                });
            }
            function q() {
                return d.execute(I.query);
            }
            function r(a) {
                return d.execute(I['delete'], {
                    id: a,
                });
            }
            function s(a, b) {
                return d.execute(P.get, {
                    id: a,
                    search: b.search,
                    order: b.order || void 0,
                });
            }
            function t(a, b) {
                return d.execute(
                    P.save,
                    {
                        id: a,
                    },
                    {
                        email: b,
                    }
                );
            }
            function u(a, b) {
                return d.execute(
                    Q.save,
                    {
                        id: a,
                    },
                    {
                        email: b,
                    }
                );
            }
            function v(a, b) {
                return d.execute(Q['delete'], {
                    id: a,
                    email: b,
                });
            }
            function w(a, b) {
                return d.execute(P['delete'], {
                    id: a,
                    email: b,
                });
            }
            function x(a) {
                return d.execute(R.get, {
                    token: a,
                });
            }
            var y = c.buildUrl('websites/:id'),
                z = c.buildUrl('websites/:id/settings/notifications'),
                A = c.buildUrl('websites/:id/settings/recording'),
                B = c.buildUrl('websites/:id/settings/co_browsing'),
                C = c.buildUrl('websites/cancreate'),
                D = c.buildUrl('websites/:id/code'),
                E = c.buildUrl('websites/:id/name'),
                F = c.buildUrl('websites/:id/collaborators/:email'),
                G = c.buildUrl('websites/:id/invitations/:email'),
                H = c.buildUrl('accept_invitation/:token'),
                I = b(y, null, {
                    update: {
                        method: 'PUT',
                    },
                }),
                J = b(z, null, {
                    update: {
                        method: 'PUT',
                    },
                }),
                K = b(A, null, {
                    update: {
                        method: 'PUT',
                    },
                }),
                L = b(B, null, {
                    update: {
                        method: 'PUT',
                    },
                }),
                M = b(C),
                N = b(D),
                O = b(E),
                P = b(F),
                Q = b(G),
                R = b(H);
            return {
                getWebsiteName: e,
                createNew: g,
                canCreateNew: f,
                saveWebsiteData: h,
                saveNotificationSettings: i,
                getNotificationSettings: j,
                saveRecordingSettings: k,
                saveCoBrowsingSettings: l,
                getRecordingSettings: m,
                getCoBrowsingSettings: n,
                getAllWebsites: q,
                deleteWebsite: r,
                getWebsiteData: o,
                getWebsiteCode: p,
                getCollaborators: s,
                inviteCollaborator: t,
                resendInvitation: u,
                revokeInvitation: v,
                getInvitation: x,
                removeCollaborator: w,
            };
        },
    ]);
