export const IS_ABSOLUTE_URL = /^(?:[a-z]+:)?\/\//i;
export const WHITESPACE_REGEX = /^\s*$/;
export const MILLISECONDS_IN_SECOND = 1e3;

// todo:
export const lodash: any = {};
export const $location: any = window.location;
export const $document = [document];
export const $window = window;

//
function mergeObjects(aaa?, bbb?) {
    var a = [{}];
    return (
        angular.forEach(arguments, function(b) {
            angular.isObject(b) && a.push(b);
        }),
        angular.extend.apply(null, a)
    );
}
function cloneObject(a) {
    return mergeObjects({}, a);
}
function shallowClone(a) {
    return lodash.clone(a);
}
function l() {
    var a = lodash([]),
        b: any = [];
    return (
        angular.forEach(arguments, function(a) {
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
    return IS_ABSOLUTE_URL.test(a);
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
            angular.forEach(b, function(a) {
                d += ' ' + a.name + '="' + a.value + '"';
            }),
        (d += c ? '/>' : '></' + a + '>')
    );
}
function q(a, b) {
    return (a = lodash.trim(a)), b > 1 && (a += 's'), a;
}
function r(a) {
    var b = '?';
    return (
        angular.forEach(a, function(a, c) {
            b += c + '=' + a + '&';
        }),
        lodash.trimEnd(b, '&')
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
    var c = $location.search()[a];
    try {
        return JSON.parse(c);
    } catch (d) {
        return c;
    }
}
function forEach() {
    return angular.forEach;
    // angular.forEach.apply(angular, arguments);
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
    var b = $document[0];
    b.cookie = a + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function F(a) {
    return a / MILLISECONDS_IN_SECOND;
}
function G(a, b) {
    return lodash.isEqual(a, b);
}
function H() {
    var a = $document[0];
    return a.referrer;
}
function I() {
    return !!$window.navigator.userAgent.match(/Trident/g) || !!$window.navigator.userAgent.match(/MSIE/g);
}
function isBrowserNotSupported() {
    var a = $window.navigator.userAgent;
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
    var c = shallowClone(a);
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
    return WHITESPACE_REGEX.test(a);
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

export const utils = {
    mergeObjects: mergeObjects,
    cloneObject: cloneObject,
    shallowClone: shallowClone,
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
    forEach: angular.forEach,
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
    isBrowserNotSupported: isBrowserNotSupported,
    getTopParentOfNode: K,
    isEllipsisActive: L,
    isDifferentActivity: M,
    matchesSelector: O,
    getParentElement: P,
    isWhitespaceString: Q,
    replaceInsetStyleRule: S,
    addAdoptedStyleSheets: R,
};
