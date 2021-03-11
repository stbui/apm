import { angular } from './angular';
import { $window, $document, $location } from './resource';

export const IS_ABSOLUTE_URL = /^(?:[a-z]+:)?\/\//i;
export const WHITESPACE_REGEX = /^\s*$/;
export const MILLISECONDS_IN_SECOND = 1e3;

// todo:
export const lodash: any = {};

//
function mergeObjects(aaa?, bbb?) {
    let a = [{}];
    angular.forEach(arguments, function (b) {
        if (angular.isObject(b)) {
            a.push(b);
        }
    });

    return a;
    // return angular.extend.apply(null, a);
}
function cloneObject(a) {
    return mergeObjects({}, a);
}
function shallowClone(a) {
    return lodash.clone(a);
}
function concatenateArrays() {
    var a = lodash([]);
    var b: any = [];

    angular.forEach(arguments, function (a) {
        if (isArray(a)) {
            b.push(a);
        }
    });
    return a.concat.apply(a, b).value();
}
function getUrlProtocol(url: string) {
    if (isAbsoluteUrl(url)) {
        var link = document.createElement('a');
        link.href = url;
        return link.protocol.replace(':', '');
    }
}
function isAbsoluteUrl(url) {
    return IS_ABSOLUTE_URL.test(url);
}
function evaluateAbsoluteUrl(a, b) {
    // var c = angular.element('<iframe class="ng-hide"></iframe>');
    // angular.element('body').append(c);
    // var d = c[0].contentDocument;
    // angular.element('head', d).append('<base href="' + a + '">'),
    //     angular.element('body', d).append('<a href="' + b + '"></a>');
    // var e = angular.element('a', d)[0];
    // angular.element(c).remove();
    // return e.href;

    // FIXME:
    return window.location.href;
}
function buildHtmlString(tagName, attributes, c?) {
    var d = '<' + tagName;

    if (isArray(attributes)) {
        angular.forEach(attributes, function (a) {
            d += ' ' + a.name + '="' + a.value + '"';
        });
    }
    d += c ? '/>' : '></' + tagName + '>';

    return d;
}
function pluralize(a, b) {
    a = lodash.trim(a);
    b > 1 && (a += 's');
    return a;
}
function getQueryString(a) {
    var b = '?';

    angular.forEach(a, function (a, c) {
        b += c + '=' + a + '&';
    });

    return lodash.trimEnd(b, '&');
}
function isNullOrUndefined(val) {
    return isUndefined(val) || null === val;
}
function isUndefined(val) {
    return angular.isUndefined(val);
}
function isDefined(val) {
    return !isUndefined(val);
}
function isString(val) {
    return angular.isString(val);
}
function isFunction(val) {
    return angular.isFunction(val);
}
function isArray(arr) {
    return Array.isArray(arr);
}
function isNumber(a) {
    return angular.isNumber(a);
}
function getQueryParameter(name) {
    var values: any = $location.search()[name];
    try {
        return JSON.parse(values);
    } catch (d) {
        return values;
    }
}
function forEach() {
    return angular.forEach;
    // angular.forEach.apply(angular, arguments);
}
function inArray(a, b) {
    return !!isArray(b) && b.indexOf(a) >= 0;
}
function join(array: any[], separator: string) {
    return array.join(separator);
}
function reverse(array: any[]) {
    return array.slice().reverse();
}
function removeCookieByName(name) {
    var doc = $document[0];
    doc.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
function millisecondsToSeconds(num: number) {
    return num / MILLISECONDS_IN_SECOND;
}
function areObjectsEqual(a, b) {
    return lodash.isEqual(a, b);
}
function getReferrer() {
    var doc = $document[0];
    return doc.referrer;
}
function isBrowserIE() {
    return !!$window.navigator.userAgent.match(/Trident/g) || !!$window.navigator.userAgent.match(/MSIE/g);
}
function isBrowserNotSupported() {
    var userAgent = $window.navigator.userAgent;
    return !!userAgent.match(/Edge/g) || !!userAgent.match(/MSIE/g);
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
    var d = N(a, c);
    var e = N(b, c);
    return !areObjectsEqual(d, e);
}
function N(a, b) {
    var c = shallowClone(a);
    delete c.details.id;

    return {
        time: b ? b(c.time) : c.time,
        type: c.type,
        details: c.details,
    };
}
function matchesSelector(a, b) {
    if (!a) return !1;
    var c = a.matches || a.msMatchesSelector || a.webkitMatchesSelector;
    return !!c && c.call(a, b);
}
function getParentElement(a: { parentElement: string; ownerDocument: any; getRootNode: any }) {
    var parentElement = a.parentElement;
    if (parentElement) return parentElement;
    var c = isFunction(a.getRootNode) ? a.getRootNode().host : null;
    return c ? c : a.ownerDocument.defaultView.frameElement;
}
function isWhitespaceString(val) {
    return WHITESPACE_REGEX.test(val);
}
function addAdoptedStyleSheets(a, b) {
    var c = !!a.host;
    if (undefined === a.adoptedStyleSheets) {
        var d = c ? a : a.head;
        var e = 'ss-adopted-styles';
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
function replaceInsetStyleRule(style) {
    var b = '(\\d+(?:px|em|%)|auto|inherit|initial|unset)';
    var c = new RegExp('inset:\\s*' + b + '\\s*;');
    var d = new RegExp('inset:\\s*' + b + '\\s*' + b + ';');
    var e = new RegExp('inset:\\s*' + b + '\\s*' + b + '\\s*' + b + ';');
    var f = new RegExp('inset:\\s*' + b + '\\s*' + b + '\\s*' + b + '\\s*' + b + ';');

    style = style.replace(c, 'top: $1; left: $1; right: $1; bottom: $1;');
    style = style.replace(d, 'top: $1; left: $2; right: $2; bottom: $1;');
    style = style.replace(e, 'top: $1; left: $2; right: $2; bottom: $3');
    style = style.replace(f, 'top: $1; left: $2; right: $3; bottom: $4;');

    return style;
}

export const utils = {
    mergeObjects: mergeObjects,
    cloneObject: cloneObject,
    shallowClone: shallowClone,
    concatenateArrays: concatenateArrays,
    isAbsoluteUrl: isAbsoluteUrl,
    getUrlProtocol: getUrlProtocol,
    evaluateAbsoluteUrl: evaluateAbsoluteUrl,
    buildHtmlString: buildHtmlString,
    pluralize: pluralize,
    getQueryString: getQueryString,
    isNullOrUndefined: isNullOrUndefined,
    isUndefined: isUndefined,
    isDefined: isDefined,
    isString: isString,
    isFunction: isFunction,
    isArray: isArray,
    forEach: angular.forEach,
    inArray: inArray,
    isNumber: isNumber,
    getQueryParameter: getQueryParameter,
    reverse: reverse,
    join: join,
    removeCookieByName: removeCookieByName,
    millisecondsToSeconds: millisecondsToSeconds,
    areObjectsEqual: areObjectsEqual,
    noop: angular.noop,
    getReferrer: getReferrer,
    isBrowserIE: isBrowserIE,
    isBrowserNotSupported: isBrowserNotSupported,
    getTopParentOfNode: getTopParentOfNode,
    isEllipsisActive: isEllipsisActive,
    isDifferentActivity: isDifferentActivity,
    matchesSelector: matchesSelector,
    getParentElement: getParentElement,
    isWhitespaceString: isWhitespaceString,
    replaceInsetStyleRule: replaceInsetStyleRule,
    addAdoptedStyleSheets: addAdoptedStyleSheets,
};
