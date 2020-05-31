const PROPERTY_OBJECT_KEY = '__sessionstack_player__';
const NAMESPACES = {
    HTML: 'http://www.w3.org/1999/xhtml',
    SVG: 'http://www.w3.org/2000/svg',
};
const ALLOWED_SRC_PROTOCOLS = ['http', 'https', 'ftp', 'data'];
const STYLE_ELEMENT_NAMES = ['STYLE', 'LINK'];

function l(a) {
    var b = this;
    a = a || {};
    var d = a.frameElementId || a.hostElementId;
    if (((b.documentsCollection[d] = a), (a.childDocuments = {}), !utils.isUndefined(d))) {
        var e = m.call(b, d);
        e && (e.childDocuments[d] = true);
    }
}
function m(a) {
    var b = this,
        c = b.getNode(a),
        d = K.call(b, c);
    if (d) {
        var e = Y(d).nodeId;
        return b.documentsCollection[e];
    }
}
function n(a, b) {
    for (var c, d = this, e = [a]; e.length > 0; )
        if ((c = d.documentsCollection[e.shift()])) {
            b.call(d, c);
            for (var f in c.childDocuments) e.push(f);
        }
}
function o(a) {
    var b = this;
    n.call(b, a, t);
}
function p(a) {
    n.call(this, a, function (a) {
        angular.element(a.documentElement).remove();
    });
}
function q(a) {
    var b = this;
    if (b.isAttached) {
        var d = b.getNode(a.hostElementId);
        if (d) {
            var e = r(d, a);
            if (e) {
                utils.addAdoptedStyleSheets(e, a.adoptedStyleSheets), s.call(b, e, a), e.append(a.documentElement);
                var f = Y(a.documentElement),
                    g = Y(e);
                Object.assign(g, f), g.adoptedStyleSheets && (b.adoptedStyleSheetNodes[g.nodeId] = e);
            }
        }
    }
}
function r(a, b) {
    if (a.shadowRoot) return a.shadowRoot;
    if (b.hasContentElements && a.createShadowRoot) return a.createShadowRoot();
    if (!b.hasContentElements && a.attachShadow)
        try {
            return a.attachShadow({ mode: 'open' });
        } catch (c) {
            sessionstackManager.warn(c);
        }
}
function s(a, b) {
    var c = this,
        d = Y(b.documentElement);
    c.documentElementIndex[d.nodeId] = a;
}
function t(a) {
    var b = this;
    if (b.isAttached)
        if (a.hostElementId) q.call(b, a);
        else {
            var d = F.call(b, a.frameElementId);
            d &&
                (u(d, a.docType),
                v(d, a.documentElement),
                utils.addAdoptedStyleSheets(d, a.adoptedStyleSheets),
                w.call(b, d.documentElement));
        }
}
function u(a, b) {
    a.open(), a.write(b || ''), a.close(), B(a);
}
function v(a, b) {
    b && (a.adoptNode(b), a.appendChild(b));
}
function w(a) {
    this.isAttached &&
        (x.call(this, a, '[style]', 'style'),
        x.call(this, a, 'link[rel="stylesheet"]', 'href'),
        x.call(this, a, '[src]', 'src'),
        x.call(this, a, 'img, input, iframe, canvas, embed, object, video', 'width'),
        x.call(this, a, 'img, input, iframe, canvas, embed, object, video', 'height'));
}
function x(b, c, d) {
    var e,
        f = this;
    b &&
        angular
            .element(c, b)
            .addBack(c)
            .each(function (b, c) {
                (e = c.getAttribute(d)),
                    e && (f.setAttribute(c, d, void 0), $timeout(f.setAttribute.bind(f), 0, true, c, d, e));
            });
}
function y(a, b) {
    var c,
        d = this;
    if (a.snapshot) {
        c = d.createElement(a.snapshot, a.hostElementId, a.frameElementId);
        var e = angular.element('head', c);
        return (
            e.length <= 0 && (angular.element(c).prepend('<head></head>'), (e = angular.element('head', c))),
            z(e),
            C(c, b),
            G.call(d, c, a.frameElementId),
            A.call(d, a.fullScreenNodeId),
            c
        );
    }
}
function z(a) {
    a.append(
        '<style>#_ss-cto-frame, #_ss-cto-close-btn { display: none }#_ss-cursor-overlay { display: none }@keyframes _ss-pulse-ring { 0% {transform: scale(.33);} 100% {opacity: 0;} }</style>'
    ),
        a.append(
            '<style>.' +
                FULL_SCREEN_CLASS +
                ' {    object-fit: contain;   object-fit: contain;   position: fixed !important;   top: 0px !important;   right: 0px !important;   bottom: 0px !important;   left: 0px !important;   box-sizing: border-box !important;   min-width: 0px !important;   max-width: none !important;   min-height: 0px !important;   max-height: none !important;   width: 100% !important;   height: 100% !important;   transform: none !important;   z-index: 2147483647;   background: black;}</style>'
        );
}
function A(a) {
    if (a) {
        var b = this.getNode(a);
        angular.element(b).addClass(FULL_SCREEN_CLASS), this.addFullScreenNode(a);
    }
}
function B(a) {
    var documentElement = a.documentElement;
    documentElement && a.removeChild(documentElement);
}
function C(a, b) {
    var c = angular.element('base', a);
    c.length <= 0 && ((c = angular.element('<base>')), angular.element('head', a).prepend(c)), c.attr('href', b);
}
function D(a, b) {
    if (b) return b;
    var d = a.baseUrl;
    return (
        I(a.snapshot, function (a) {
            if (a && 'BASE' === a.tagName && a.attributes) return (d = E(a, 'href')), !1;
        }),
        d ? utils.evaluateAbsoluteUrl(a.origin, d) : a.origin
    );
}
function E(a, b) {
    var c;
    return (
        a.attributes.forEach(function (a) {
            a.name === b && (c = a.value);
        }),
        c
    );
}
function F(a) {
    if (!angular.isDefined(a)) return this.documentContainer.contentWindow.document;
    var b = this.documentElementIndex[a];
    return b ? b.contentDocument || b.shadowRoot : void 0;
}
function G(a, b) {
    var c,
        d,
        e = this;
    I(a, function (a) {
        (d = Y(a)),
            (c = d.nodeId),
            (d.frameElementId = b),
            (e.documentElementIndex[c] = a),
            d.styleRules && (e.styleRuleNodes[c] = a);
    });
}
function H(a) {
    var b,
        c = this;
    I(a, function (a) {
        (b = Y(a)),
            delete c.documentElementIndex[b.nodeId],
            a.shadowRoot && ((b = Y(a.shadowRoot)), delete c.adoptedStyleSheetNodes[b.nodeId]);
    });
}
function I(a, b) {
    for (var c, d, e = [a]; e.length > 0; )
        if ((c = e.pop())) {
            if (((d = b(c)), d === !1)) return;
            if (c.childNodes) for (var f = c.childNodes.length - 1; f >= 0; f--) e.push(c.childNodes[f]);
        }
}
function J(a) {
    var b = angular.element(a).parent();
    return b.length > 0 ? b[0] : a ? a.parentNode : void 0;
}
function K(a) {
    try {
        var b = Y(a);
        return b && b.hostElementId ? this.getNode(b.hostElementId) : a.ownerDocument.defaultView.frameElement;
    } catch (c) {}
}
function L(a, b, c) {
    if (b.childNodes && b.childNodes.length > 0)
        for (var d = b.childNodes.length - 1; d >= 0; d--) a.push({ parent: c, node: b.childNodes[d] });
}
function M(a, b, c) {
    var d = {};
    switch (a.nodeType) {
        case Node.COMMENT_NODE:
            d = N.call(this, a);
            break;
        case Node.TEXT_NODE:
            d = O.call(this, a);
            break;
        case Node.DOCUMENT_FRAGMENT_NODE:
            d = P.call(this);
            break;
        case Node.ELEMENT_NODE:
            d = Q.call(this, a, c);
    }
    return (Y(d).nodeId = a.id), (Y(d).hostElementId = b), d;
}
function N(a) {
    var b = F.call(this);
    return b.createComment(a.textContent);
}
function O(a) {
    var b = F.call(this);
    return b.createTextNode(a.textContent);
}
function P() {
    var a = F.call(this);
    return a.createDocumentFragment();
}
function Q(a, b) {
    var c = (U(a.isSvg), R.call(this, a, b));
    return V.call(this, c, a), W.call(this, c), c;
}
function R(a, b) {
    try {
        return S.call(this, a, b);
    } catch (c) {
        return T.call(this, a, b);
    }
}
function S(a, b) {
    var c = this,
        d = F.call(c),
        e = U(a.isSvg),
        f = a.tagName.toLowerCase(),
        g = d.createElementNS(e, f),
        h = Y(g);
    return (
        (h.frameElementId = b),
        a.styleRules && (h.styleRules = a.styleRules.slice()),
        a.attributes &&
            a.attributes.forEach(function (a) {
                c.setAttribute(g, a.name, a.value);
            }),
        g
    );
}
function T(a, b) {
    var d = F.call(this),
        e = a.tagName.toLowerCase(),
        f = (a.attributes, utils.buildHtmlString(e, a.attributes)),
        g = d.createElement('div');
    g.innerHTML = f;
    var h = g.firstChild;
    return (Y(h).frameElementId = b), h;
}
function U(a) {
    return a ? NAMESPACES.SVG : NAMESPACES.HTML;
}
function V(a, d) {
    if (d.top || d.left) {
        var e = Y(a);
        (e.top = d.top), (e.left = d.left);
    }
    var f = d.isCrossOriginFrame,
        g = angular.element(a);
    utils.matchesSelector(a, 'script')
        ? g.removeAttr('src')
        : utils.matchesSelector(a, 'iframe')
        ? (g.removeAttr('sandbox'),
          g.removeAttr('src'),
          f && g.css({ 'background-image': 'url(' + CROSS_ORIGIN_FRAME_BACKGROUND + ')' }))
        : utils.matchesSelector(a, 'a')
        ? g.attr('href', 'javascript:void(0);')
        : utils.matchesSelector(a, 'meta[http-equiv="X-Frame-Options"]') ||
          utils.matchesSelector(a, 'meta[http-equiv="Content-Security-Policy"]')
        ? g.removeAttr('content')
        : utils.matchesSelector(a, 'link[rel="import"]') && g.attr('href', 'javascript:void(0);');
    var j: any = [];
    if (utils.matchesSelector(a, '[src]')) {
        var k = utils.getUrlProtocol(g.attr('src'));
        k && ALLOWED_SRC_PROTOCOLS.indexOf(k) < 0 && j.push('src');
    }
    for (var l = 0; l < a.attributes.length; l++) {
        var m = a.attributes[l];
        lodash.startsWith(m.name, 'on') && j.push(m.name);
    }
    j.forEach(function (a) {
        g.removeAttr(a);
    });
}
function W(a) {
    this.settings.ignoreFormsAutofill() &&
        utils.matchesSelector(a, 'input') &&
        ((a.readOnly = true),
        (a.onfocus = function () {
            a.readOnly = !1;
        }),
        (a.onblur = function () {
            a.readOnly = true;
        }));
}
function X(a, b, d) {
    angular.element(a);
    return (
        (utils.matchesSelector(a, 'script') && 'src' === b) ||
        (utils.matchesSelector(a, 'iframe') && 'src' === b) ||
        (utils.matchesSelector(a, 'meta[http-equiv="X-Frame-Options"]') && 'content' === b) ||
        'integrity' === b ||
        (utils.matchesSelector(a, 'meta[content]') &&
            'http-equiv' === b &&
            ('X-Frame-Options' === d || 'Content-Security-Policy' === d))
    );
}
function Y(a) {
    var b = a[PROPERTY_OBJECT_KEY];
    return b || ((b = {}), (a[PROPERTY_OBJECT_KEY] = b)), b;
}

export class DocumentNode {
    public isAttached;
    public documentContainer;
    public documentElementIndex;
    public documentsCollection;
    public afterAttachCallbacks;
    public styleRuleNodes;
    public adoptedStyleSheetNodes;
    public fullScreenNodes;
    public settings;

    constructor(documentContainer) {
        this.isAttached = true;
        this.documentContainer = documentContainer;
        this.documentElementIndex = [];
        this.documentsCollection = {};
        this.afterAttachCallbacks = [];
        this.styleRuleNodes = {};
        this.adoptedStyleSheetNodes = {};
        this.fullScreenNodes = [];
        this.settings = {};
    }

    public static getNodePropertyObject(a) {
        return Y(a);
    }

    attach(b) {
        var c = this;
        c.isAttached = true;
        o.call(c, void 0);
        c.afterAttachCallbacks.push($timeout(b));
    }

    detach() {
        var b = this;
        angular.forEach(b.afterAttachCallbacks, function (b) {
            $timeout.cancel(b);
        });
        b.afterAttachCallbacks = [];
        b.isAttached && ((b.isAttached = !1), p.call(b, void 0));
    }
    getNode(a) {
        return this.documentElementIndex[a];
    }
    write(a, b, c) {
        var d = this;
        angular.isUndefined(a.frameElementId) &&
            angular.isUndefined(a.hostElementId) &&
            (u(F.call(d), a.docType),
            (d.documentElementIndex = []),
            (d.documentsCollection = {}),
            (d.styleRuleNodes = {}),
            (d.adoptedStyleSheetNodes = {}));

        var f = D(a, b),
            g: any = {
                urlTransformer: new URLTransformer(f, c),
                docType: a.docType,
                frameElementId: a.frameElementId,
                hostElementId: a.hostElementId,
                hasContentElements: a.hasContentElements,
                adoptedStyleSheets: a.adoptedStyleSheets,
            };

        l.call(d, g);
        g.documentElement = y.call(d, a, f);
        if (a.adoptedStyleSheets) {
            var h = Y(g.documentElement);
            h.adoptedStyleSheets = a.adoptedStyleSheets;
        }
        t.call(d, g);
    }
    getDocumentElement(a) {
        var b = F.call(this, a);
        if (b) return b.documentElement;
    }
    prepend(a, b) {
        if (
            (!utils.matchesSelector(a, 'script') || b.nodeType !== Node.TEXT_NODE) &&
            a &&
            b &&
            (a.nodeType === Node.ELEMENT_NODE || a.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
        ) {
            a.insertBefore(b, a.firstChild);
            var frameElementId = Y(a).frameElementId;
            G.call(this, b, frameElementId);
        }
    }
    replaceDocumentElement(a, b) {
        var d = this,
            e = d.documentsCollection[b];
        utils.matchesSelector(a, 'html') && e && ((e.documentElement = a), G.call(d, a, b), t.call(d, e));
    }
    replaceDocType(a, b) {
        var c = this,
            d = c.documentsCollection[b];
        a && d && (p.call(c, b), (d.docType = a), o.call(c, b));
    }
    insertAfter(a, b) {
        var d = J(a);
        if (
            (!utils.matchesSelector(d, 'script') || b.nodeType !== Node.TEXT_NODE) &&
            d &&
            b &&
            (d.nodeType === Node.ELEMENT_NODE || d.nodeType === Node.DOCUMENT_FRAGMENT_NODE)
        ) {
            d.insertBefore(b, a.nextSibling);
            var e = Y(d).frameElementId;
            G.call(this, b, e);
        }
    }
    removeNode(a) {
        var b = J(a);
        b && (b.removeChild(a), H.call(this, a));
    }
    traverseNode(a, b) {
        I(a, b);
    }
    traverseDocuments(a, b) {
        n.call(this, a, b);
    }
    getNodeOffset(a) {
        for (var b = { top: 0, left: 0 }; a && a !== this.documentContainer; ) {
            var c = a.getBoundingClientRect();
            b.top += c.top;
            b.left += c.left;
            a = K(a);
        }
        return b;
    }
    createElement(a, b, c) {
        var d,
            e,
            f,
            g = M.call(this, a, b, c),
            h = [];
        if (a.childNodes && a.childNodes.length > 0)
            for (L(h, a, g); h.length > 0; )
                (d = h.pop()),
                    (f = void 0),
                    d.parent.nodeType !== Node.DOCUMENT_FRAGMENT_NODE && (f = d.parent.tagName.toLowerCase()),
                    'script' !== f &&
                        'noscript' !== f &&
                        ((e = M.call(this, d.node, b, c)), L(h, d.node, e), d.parent.appendChild(e));
        return g;
    }
    setAttribute(a, b, d) {
        if (!X(a, b, d)) {
            if (utils.matchesSelector(a, 'link[rel="stylesheet"],img') && ('href' === b || 'src' === b)) {
                var e = Y(a).frameElementId,
                    f = this.documentsCollection[e].urlTransformer;
                d = f.transform(d);
            }
            try {
                angular.isUndefined(d) || null === d ? a.removeAttribute(b) : a.setAttribute(b, d);
            } catch (g) {}
        }
    }
    getNodePropertyObject(a) {
        return DocumentNode.getNodePropertyObject(a);
    }
    getFrameElementIds() {
        return lodash.map(this.documentsCollection, function (a) {
            return a.frameElementId;
        });
    }
    getNodeId(a) {
        if (a) {
            var b = Y(a);
            return b.nodeId;
        }
    }
    addFullScreenNode(a) {
        this.fullScreenNodes.push(a);
    }
    traverseFullScreenNodes(a) {
        for (; this.fullScreenNodes.length > 0; ) {
            var b = this.fullScreenNodes.pop();
            if (b) {
                var c = this.getNode(b);
                a(c);
            }
        }
    }
    setSettings(settings) {
        this.settings = settings;
    }
}

// angular
//     .module('playerApp')
//     .constant('PROPERTY_OBJECT_KEY', '__sessionstack_player__')
//     .constant('NAMESPACES', {
//         HTML: 'http://www.w3.org/1999/xhtml',
//         SVG: 'http://www.w3.org/2000/svg',
//     })
//     .constant('ALLOWED_SRC_PROTOCOLS', ['http', 'https', 'ftp', 'data'])
//     .constant('STYLE_ELEMENT_NAMES', ['STYLE', 'LINK'])
//     .factory('DocumentNode', [
//         '$timeout',
//         'lodash',
//         'utils',
//         'sessionstackManager',
//         'URLTransformer',
//         'PROPERTY_OBJECT_KEY',
//         'NAMESPACES',
//         'ALLOWED_SRC_PROTOCOLS',
//         'CROSS_ORIGIN_FRAME_BACKGROUND',
//         'STYLE_ELEMENT_NAMES',
//         'FULL_SCREEN_CLASS',
//         function (
//             $timeout,
//             lodash,
//             utils,
//             sessionstackManager,
//             URLTransformer,
//             PROPERTY_OBJECT_KEY,
//             NAMESPACES,
//             ALLOWED_SRC_PROTOCOLS,
//             CROSS_ORIGIN_FRAME_BACKGROUND,
//             STYLE_ELEMENT_NAMES,
//             FULL_SCREEN_CLASS
//         ) {
//             var Z = function (documentContainer) {};
//             return (
//                 ,
//                 Z
//             );
//         },
//     ]);
