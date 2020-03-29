angular
    .module('playerApp')
    .constant('PROPERTY_OBJECT_KEY', '__sessionstack_player__')
    .constant('NAMESPACES', {
        HTML: 'http://www.w3.org/1999/xhtml',
        SVG: 'http://www.w3.org/2000/svg',
    })
    .constant('ALLOWED_SRC_PROTOCOLS', ['http', 'https', 'ftp', 'data'])
    .constant('STYLE_ELEMENT_NAMES', ['STYLE', 'LINK'])
    .factory('DocumentNode', [
        '$timeout',
        'lodash',
        'utils',
        'URLTransformer',
        'PROPERTY_OBJECT_KEY',
        'NAMESPACES',
        'ALLOWED_SRC_PROTOCOLS',
        'CROSS_ORIGIN_FRAME_BACKGROUND',
        'STYLE_ELEMENT_NAMES',
        function(a, b, c, d, e, f, g, h, i) {
            function j(a) {
                a = a || {};
                var b = a.frameElementId;
                if (((this.documentsCollection[b] = a), (a.childDocuments = {}), angular.isDefined(b))) {
                    var c = k.call(this, b);
                    if (!c) return;
                    c.childDocuments[b] = !0;
                }
            }
            function k(a) {
                var b = this,
                    c = b.getNode(a),
                    d = E(c);
                if (d) {
                    var e = Q(d).nodeId;
                    return b.documentsCollection[e];
                }
            }
            function l(a, b) {
                for (var c, d = this, e = [a]; e.length > 0; )
                    (c = d.documentsCollection[e.shift()]),
                        c &&
                            (b.call(d, c),
                            angular.forEach(c.childDocuments, function(a, b) {
                                e.push(b);
                            }));
            }
            function m(a) {
                l.call(this, a, o);
            }
            function n(a) {
                l.call(this, a, function(a) {
                    angular.element(a.documentElement).remove();
                });
            }
            function o(a) {
                var b = this;
                if (b.isAttached) {
                    var c = z.call(b, a.frameElementId);
                    c && (p(c, a.docType), q(c, a.documentElement), r.call(b, c.documentElement));
                }
            }
            function p(a, b) {
                a.open(), a.write(b || ''), a.close(), u(a);
            }
            function q(a, b) {
                b && (a.adoptNode(b), a.appendChild(b));
            }
            function r(a) {
                this.isAttached &&
                    (s.call(this, a, '[style]', 'style'),
                    s.call(this, a, 'link[rel="stylesheet"]', 'href'),
                    s.call(this, a, '[src]', 'src'));
            }
            function s(b, c, d) {
                var e,
                    f = this;
                b &&
                    angular
                        .element(c, b)
                        .addBack(c)
                        .each(function(b, c) {
                            (e = c.getAttribute(d)),
                                e && (f.setAttribute(c, d, void 0), a(f.setAttribute.bind(f), 0, !0, c, d, e));
                        });
            }
            function t(a, b) {
                var c,
                    d = this;
                if (a.snapshot) {
                    c = d.createElement(a.snapshot);
                    var e = angular.element('head', c);
                    e.length <= 0 && (angular.element(c).prepend('<head></head>'), (e = angular.element('head', c))),
                        v(c, b),
                        y.call(d, c, a.frameElementId),
                        A.call(d, c, a.frameElementId);
                }
                return c;
            }
            function u(a) {
                var b = a.documentElement;
                b && a.removeChild(b);
            }
            function v(a, b) {
                var c = angular.element('base', a);
                c.length <= 0 && ((c = angular.element('<base>')), angular.element('head', a).prepend(c)),
                    c.attr('href', b);
            }
            function w(a) {
                var b;
                return (
                    C(a.snapshot, function(a) {
                        if (a && 'BASE' === a.tagName && a.attributes) return (b = x(a, 'href')), !1;
                    }),
                    b ? c.evaluateAbsoluteUrl(a.origin, b) : a.origin
                );
            }
            function x(a, b) {
                var c;
                return (
                    angular.forEach(a.attributes, function(a) {
                        a.name === b && (c = a.value);
                    }),
                    c
                );
            }
            function y(a, b) {
                var c = this,
                    d = c.documentsCollection[b].urlTransformer;
                angular.element('link[rel="stylesheet"]', a).each(function(a, b) {
                    var c = angular.element(b),
                        e = c.attr('href');
                    (e = d.transform(e)), c.attr('href', e);
                });
            }
            function z(a) {
                if (!angular.isDefined(a)) return this.documentContainer.contentWindow.document;
                var b = this.documentElementIndex[a];
                return b ? b.contentDocument : void 0;
            }
            function A(a, b) {
                var c,
                    d,
                    e = this;
                C(a, function(a) {
                    (d = Q(a)),
                        (c = d.nodeId),
                        (d.frameElementId = b),
                        (e.documentElementIndex[c] = a),
                        d.styleRules && (e.styleRuleNodes[c] = a);
                });
            }
            function B(a) {
                var b,
                    c = this;
                C(a, function(a) {
                    (b = Q(a).nodeId), delete c.documentElementIndex[b];
                });
            }
            function C(a, b) {
                for (var c, d, e = [a]; e.length > 0; )
                    if ((c = e.shift())) {
                        if (((d = b(c)), d === !1)) return;
                        angular.forEach(c.childNodes, function(a) {
                            e.push(a);
                        });
                    }
            }
            function D(a) {
                var b = angular.element(a).parent();
                if (b.length > 0) return b[0];
            }
            function E(a) {
                try {
                    return a.ownerDocument.defaultView.frameElement;
                } catch (b) {}
            }
            function F(a, b, c) {
                b.childNodes &&
                    b.childNodes.length > 0 &&
                    angular.forEach(b.childNodes, function(b) {
                        a.push({ parent: c, node: b });
                    });
            }
            function G(a) {
                var b = {};
                switch (a.nodeType) {
                    case Node.COMMENT_NODE:
                        b = H.call(this, a);
                        break;
                    case Node.TEXT_NODE:
                        b = I.call(this, a);
                        break;
                    case Node.ELEMENT_NODE:
                        b = J.call(this, a);
                }
                return (Q(b).nodeId = a.id), b;
            }
            function H(a) {
                var b = z.call(this);
                return b.createComment(a.textContent);
            }
            function I(a) {
                var b = z.call(this);
                return b.createTextNode(a.textContent);
            }
            function J(a) {
                var b = (N(a.isSvg), K.call(this, a));
                return O.call(this, b, a), b;
            }
            function K(a) {
                try {
                    return L.call(this, a);
                } catch (b) {
                    return M.call(this, a);
                }
            }
            function L(a) {
                var b = this,
                    c = z.call(b),
                    d = N(a.isSvg),
                    e = a.tagName.toLowerCase(),
                    f = c.createElementNS(d, e);
                if (a.styleRules) {
                    var g = Q(f);
                    g.styleRules = a.styleRules;
                }
                return (
                    a.attributes &&
                        angular.forEach(a.attributes, function(a) {
                            b.setAttribute(f, a.name, a.value);
                        }),
                    f
                );
            }
            function M(a) {
                var b = z.call(this),
                    d = a.tagName.toLowerCase(),
                    e = (a.attributes, c.buildHtmlString(d, a.attributes)),
                    f = b.createElement('div');
                return (f.innerHTML = e), f.firstChild;
            }
            function N(a) {
                return a ? f.SVG : f.HTML;
            }
            function O(a, d) {
                if (d.top || d.left) {
                    var e = Q(a);
                    (e.top = d.top), (e.left = d.left);
                }
                var f = d.isCrossOriginFrame,
                    i = angular.element(a);
                i.is('script')
                    ? i.removeAttr('src')
                    : i.is('iframe')
                    ? (i.removeAttr('sandbox'),
                      i.removeAttr('src'),
                      f && i.css({ 'background-image': 'url(' + h + ')' }))
                    : i.is('a')
                    ? i.attr('href', 'javascript:void(0);')
                    : (i.is('meta[http-equiv="X-Frame-Options"]') ||
                          i.is('meta[http-equiv="Content-Security-Policy"]')) &&
                      i.removeAttr('content');
                var j = [];
                if (i.is('[src]')) {
                    var k = c.getUrlProtocol(i.attr('src'));
                    k && g.indexOf(k) < 0 && j.push('src');
                }
                angular.forEach(a.attributes, function(a) {
                    b.startsWith(a.name, 'on') && j.push(a.name);
                }),
                    angular.forEach(j, function(a) {
                        i.removeAttr(a);
                    });
            }
            function P(a, b, c) {
                var d = angular.element(a);
                return (
                    (d.is('script') && 'src' === b) ||
                    (d.is('iframe') && 'src' === b) ||
                    (d.is('meta[http-equiv="X-Frame-Options"]') && 'content' === b) ||
                    'integrity' === b ||
                    (d.is('meta[content]') &&
                        'http-equiv' === b &&
                        ('X-Frame-Options' === c || 'Content-Security-Policy' === c))
                );
            }
            function Q(a) {
                var b = a[e];
                return b || ((b = {}), (a[e] = b)), b;
            }
            function R(a) {
                return angular.isNumber(Q(a).nodeId);
            }
            var S = function(a) {
                (this.isAttached = !0),
                    (this.documentContainer = a),
                    (this.documentElementIndex = []),
                    (this.documentsCollection = {}),
                    (this.afterAttachCallbacks = []),
                    (this.styleRuleNodes = {});
            };
            return (
                (S.prototype.detach = function() {
                    var b = this;
                    angular.forEach(b.afterAttachCallbacks, function(b) {
                        a.cancel(b);
                    }),
                        (b.afterAttachCallbacks = []),
                        b.isAttached && ((b.isAttached = !1), n.call(b, void 0));
                }),
                (S.prototype.attach = function(b) {
                    var c = this;
                    (c.isAttached = !0), m.call(c, void 0), c.afterAttachCallbacks.push(a(b));
                }),
                (S.prototype.write = function(a, b) {
                    var c = this;
                    angular.isUndefined(a.frameElementId) && p(z.call(c), a.docType),
                        angular.isUndefined(a.frameElementId) &&
                            ((c.documentElementIndex = []), (c.documentsCollection = {}));
                    var e = w(a),
                        f = {
                            urlTransformer: new d(e, b),
                            docType: a.docType,
                            frameElementId: a.frameElementId,
                        };
                    j.call(c, f), (f.documentElement = t.call(c, a, e)), o.call(c, f);
                }),
                (S.prototype.getDocumentElement = function(a) {
                    var b = z.call(this, a);
                    if (b) return b.documentElement;
                }),
                (S.prototype.getNode = function(a) {
                    return this.documentElementIndex[a];
                }),
                (S.prototype.prepend = function(a, b) {
                    if (
                        (!angular.element(a).is('script') || b.nodeType !== Node.TEXT_NODE) &&
                        a &&
                        b &&
                        a.nodeType === Node.ELEMENT_NODE
                    ) {
                        a.insertBefore(b, a.firstChild);
                        var c = Q(a).frameElementId;
                        y.call(this, b, c), A.call(this, b, c);
                    }
                }),
                (S.prototype.replaceDocumentElement = function(a, b) {
                    var c = this,
                        d = c.documentsCollection[b];
                    angular.element(a).is('html') &&
                        d &&
                        ((d.documentElement = a), y.call(this, a, b), A.call(c, a, b), o.call(c, d));
                }),
                (S.prototype.replaceDocType = function(a, b) {
                    var c = this,
                        d = c.documentsCollection[b];
                    a && d && (n.call(c, b), (d.docType = a), m.call(c, b));
                }),
                (S.prototype.insertAfter = function(a, b) {
                    var c = D(a);
                    if (
                        (!angular.element(c).is('script') || b.nodeType !== Node.TEXT_NODE) &&
                        c &&
                        b &&
                        c.nodeType === Node.ELEMENT_NODE
                    ) {
                        c.insertBefore(b, a.nextSibling);
                        var d = Q(c).frameElementId;
                        y.call(this, b, d), A.call(this, b, d);
                    }
                }),
                (S.prototype.removeNode = function(a) {
                    var b = D(a);
                    b && (b.removeChild(a), B.call(this, a));
                }),
                (S.prototype.traverseNode = function(a, b) {
                    C(a, b);
                }),
                (S.prototype.traverseDocuments = function(a, b) {
                    l.call(this, a, b);
                }),
                (S.prototype.getNodeOffset = function(a) {
                    for (var b = { top: 0, left: 0 }; a && a !== this.documentContainer; ) {
                        var c = a.getBoundingClientRect();
                        (b.top += c.top), (b.left += c.left), (a = E(a));
                    }
                    return b;
                }),
                (S.prototype.createElement = function(a) {
                    var b,
                        c,
                        d,
                        e = G.call(this, a),
                        f = [];
                    if (a.childNodes && a.childNodes.length > 0)
                        for (F(f, a, e); f.length > 0; )
                            (b = f.shift()),
                                (d = b.parent.tagName.toLowerCase()),
                                'script' !== d &&
                                    'noscript' !== d &&
                                    ((c = G.call(this, b.node)), F(f, b.node, c), b.parent.appendChild(c));
                    return e;
                }),
                (S.prototype.setAttribute = function(a, b, c) {
                    if (!P(a, b, c)) {
                        if (angular.element(a).is('link[rel="stylesheet"]') && R(a) && 'href' === b) {
                            var d = Q(a).frameElementId,
                                e = this.documentsCollection[d].urlTransformer;
                            c = e.transform(c);
                        }
                        try {
                            angular.isUndefined(c) || null === c ? a.removeAttribute(b) : a.setAttribute(b, c);
                        } catch (f) {}
                    }
                }),
                (S.prototype.getNodePropertyObject = function(a) {
                    return Q(a);
                }),
                (S.prototype.getFrameElementIds = function() {
                    return b.map(this.documentsCollection, function(a) {
                        return a.frameElementId;
                    });
                }),
                S
            );
        },
    ]);
