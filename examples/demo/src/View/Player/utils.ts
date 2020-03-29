import { timeout } from './timeout';
import { angular } from './angular';
import e from 'lodash';

const IS_ABSOLUTE_URL = /^(?:[a-z]+:)?\/\//i;
const MILLISECONDS_IN_SECOND = 1e3;

// angular.module("commonApp").constant("IS_ABSOLUTE_URL", /^(?:[a-z]+:)?\/\//i).constant("MILLISECONDS_IN_SECOND", 1e3).factory("utils", ["$timeout", "$location", "$document", "$window", "lodash", "IS_ABSOLUTE_URL", "MILLISECONDS_IN_SECOND", function(a, b, c, d, e, f, g) {
function mergeObjects() {
    var a = [{}];
    return (
        angular.forEach(arguments, function(b) {
            angular.isObject(b) && a.push(b);
        }),
        angular.extend.apply(null, a)
    );
}
function cloneObject(a) {
    // @ts-ignore
    return mergeObjects({}, a);
}
function shallowClone(a) {
    return e.clone(a);
}
function concatenateArrays() {
    var a = e([]),
        b = [];
    return (
        angular.forEach(arguments, function(a) {
            isArray(a) && b.push(a);
        }),
        a.concat.apply(a, b).value()
    );
}
function mergeSortedArrays(a, b, c) {
    a = a || [];
    var d = 0,
        e = a.length;
    b = b || [];
    for (var f = 0, g = b.length, h = []; d < e && f < g; )
        a[d][c] <= b[f][c] ? (h.push(a[d]), d++) : (h.push(b[f]), f++);
    for (; d < e; d++) h.push(a[d]);
    for (; f < g; f++) h.push(b[f]);
    return h;
}
function getUrlProtocol(a) {
    if (isAbsoluteUrl(a)) {
        var b = document.createElement('a');
        return (b.href = a), b.protocol.replace(':', '');
    }
}
function isAbsoluteUrl(a) {
    return IS_ABSOLUTE_URL.test(a);
}
function evaluateAbsoluteUrl(origin, url) {
    var c = angular.element('<iframe class="ng-hide"></iframe>');
    angular.element('body').append(c);
    var d = c[0].contentDocument;
    angular.element('head', d).append('<base href="' + origin + '">'),
        angular.element('body', d).append('<a href="' + url + '"></a>');
    var e = angular.element('a', d)[0];
    return angular.element(c).remove(), e.href;
}
function buildHtmlString(tagName, attributes, c?) {
    var tag = '<' + tagName;

    if (isArray(attributes)) {
        angular.forEach(attributes, attribute => {
            tag += ' ' + attribute.name + '="' + attribute.value + '"';
        });
    }

    tag += c ? '/>' : '></' + tagName + '>';

    return tag;
}
function pluralize(a, b) {
    return (a = e.trim(a)), b > 1 && (a += 's'), a;
}
function getQueryString(a) {
    var b = '?';
    return (
        angular.forEach(a, function(a, c) {
            b += c + '=' + a + '&';
        }),
        e.trimEnd(b, '&')
    );
}
function isNullOrUndefined(a) {
    return isUndefined(a) || null === a;
}
function isUndefined(a) {
    return angular.isUndefined(a);
}
function isDefined(a) {
    return !isUndefined(a);
}
function isString(a) {
    return angular.isString(a);
}
function isFunction(a) {
    return angular.isFunction(a);
}
function isArray(a) {
    return angular.isArray(a);
}
function isNumber(a) {
    return angular.isNumber(a);
}
function getQueryParameter(a) {
    // var c = b.search()[a];
    var c = location.search()[a];
    try {
        return JSON.parse(c);
    } catch (d) {
        return c;
    }
}
function forEach() {
    angular.forEach.apply(angular, arguments);
}
function inArray(a, b) {
    return !!isArray(b) && b.indexOf(a) >= 0;
}
function join(a, b) {
    return a.join(b);
}
function reverse(a) {
    return a.slice().reverse();
}
function removeCookieByName(a) {
    // var b = c[0];
    var b = document;
    b.cookie = a + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function millisecondsToSeconds(a) {
    return a / MILLISECONDS_IN_SECOND;
}
function areObjectsEqual(a, b) {
    return e.isEqual(a, b);
}
function getReferrer() {
    // var a = c[0];
    var a = document;
    return a.referrer;
}
function isBrowserIE() {
    return !!window.navigator.userAgent.match(/Trident/g) || !!window.navigator.userAgent.match(/MSIE/g);
}
function getTopParentOfNode(a) {
    if (a) {
        for (var b = a.parentNode, c = a; b; ) (c = b), (b = b.parentNode);
        return c;
    }
}
function isEllipsisActive(a) {
    return !!a && a.scrollWidth > a.clientWidth;
}
function isDifferentActivity(a, b, c) {
    if (!a && !b) return !1;
    if (!a || !b) return !0;
    var d = M(a, c),
        e = M(b, c);
    return !areObjectsEqual(d, e);
}
function M(a, b) {
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

export default {
    mergeObjects: mergeObjects,
    cloneObject,
    shallowClone,
    concatenateArrays,
    isAbsoluteUrl,
    getUrlProtocol,
    evaluateAbsoluteUrl,
    buildHtmlString,
    pluralize,
    mergeSortedArrays,
    getQueryString,
    isNullOrUndefined,
    isUndefined,
    isDefined,
    isString,
    isFunction,
    isArray,
    forEach,
    inArray,
    isNumber,
    getQueryParameter,
    reverse,
    join,
    removeCookieByName,
    millisecondsToSeconds,
    areObjectsEqual,
    noop: angular.noop,
    getReferrer,
    isBrowserIE,
    getTopParentOfNode,
    isEllipsisActive,
    isDifferentActivity,
};
