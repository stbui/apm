angular.module('playerApp').factory('BrokerWebSocketClient', [
    'BROKER_URL',
    function(a) {
        function b(a, e, f) {
            var g = this;
            (g.eventListeners = []),
                (g.requestsQueue = []),
                (g.reconnectInProgress = !1),
                (g.isDisconnected = !0),
                (f = f || {});
            var h = f.heartbeatInterval || b.DEFAULT_HEARTBEAT_INTERVAL,
                i = f.retries || b.DEFAULT_AUTORECONNECT_RETRIES;
            (g.reconnectService = new c(g, h, i)), (g.connectorService = new d(a, e));
        }
        function c(a, b, c) {
            var d = this;
            (d.client = a), (d.heartbeatInterval = b), (d.maxRetries = c), (d.retries = 0), (d.interval = null);
        }
        function d(a, b) {
            var c = this;
            (c.host = a), (c.path = b);
        }
        return (
            (b.isSupported = function() {
                return !!window.WebSocket;
            }),
            (b.createStreamingClient = function(c) {
                return new b(a, 'sender/session/' + c);
            }),
            (b.createChatClient = function(c) {
                return new b(a, 'player/chat/' + c);
            }),
            (b.DEFAULT_HEARTBEAT_INTERVAL = 2e3),
            (b.DEFAULT_AUTORECONNECT_RETRIES = -1),
            (b.prototype = {
                reconnect: function(a) {
                    var b = this;
                    return (
                        (a = a || function() {}),
                        b.reconnectInProgress
                            ? a()
                            : ((b.reconnectInProgress = !0),
                              void b.connect(function(c) {
                                  (b.reconnectInProgress = !1), a(c);
                              }))
                    );
                },
                connect: function(a) {
                    var c = this;
                    return (
                        (a = a || function(a) {}),
                        b.isSupported()
                            ? (c.reconnectService.stop(),
                              (c.isDisconnected = !1),
                              void c.connectorService.connect(function(b, d) {
                                  return c.isDisconnected
                                      ? a()
                                      : b
                                      ? (c.reconnectService.start(), a(b))
                                      : ((c.socket = d),
                                        c.eventListeners.forEach(function(a) {
                                            c.socket.addEventListener(a.type, a.listener);
                                        }),
                                        c.isOpen()
                                            ? c.sendPendingRequests()
                                            : c.socket.addEventListener(
                                                  'open',
                                                  function() {
                                                      c.sendPendingRequests();
                                                  },
                                                  { once: !0 }
                                              ),
                                        c.reconnectService.start(),
                                        void a());
                              }))
                            : a()
                    );
                },
                disconnect: function(a) {
                    var c = this;
                    return (
                        (a = a || angular.noop),
                        !b.isSupported() || c.isDisconnected
                            ? a()
                            : (c.reconnectService.stop(),
                              (c.isDisconnected = !0),
                              c.socket && c.socket.close(),
                              (c.socket = null),
                              void (c.eventListeners = c.eventListeners.filter(function(a) {
                                  return !a.discardOnDisconnect;
                              })))
                    );
                },
                send: function(a) {
                    var b = this;
                    if (!b.isDisconnected) return b.isOpen() ? void b.socket.send(a) : void b.requestsQueue.push(a);
                },
                addEventListener: function(a, b, c) {
                    var d = this;
                    (c = c || { discardOnDisconnect: !1 }),
                        d.eventListeners.push({
                            type: a,
                            listener: b,
                            discardOnDisconnect: c.discardOnDisconnect,
                        }),
                        d.socket && d.socket.addEventListener(a, b);
                },
                isOpen: function() {
                    var a = this;
                    return !!a.socket && a.socket.readyState == WebSocket.OPEN;
                },
                isConnecting: function() {
                    var a = this;
                    return !!a.socket && a.socket.readyState === WebSocket.CONNECTING;
                },
                sendPendingRequests: function() {
                    var a = this;
                    a.requestsQueue.forEach(function(b) {
                        a.socket.send(b);
                    }),
                        (a.requestsQueue = []);
                },
                discardPendingRequests: function() {
                    var a = this;
                    a.requestsQueue = [];
                },
            }),
            (c.prototype = {
                start: function() {
                    var a = this;
                    a.interval = setInterval(function() {
                        return a.client.isConnecting() || a.client.isOpen()
                            ? void (a.retries = 0)
                            : a.maxRetries !== -1 && a.retries > a.maxRetries
                            ? void a.stop()
                            : ((a.retries += 1), void a.client.reconnect());
                    }, a.heartbeatInterval);
                },
                stop: function() {
                    var a = this;
                    clearInterval(a.interval), (a.interval = null), (a.retries = 0);
                },
            }),
            (d.prototype = {
                getUrlForNode: function(a) {
                    var b = this;
                    return a + b.path;
                },
                connectToNode: function(a, b) {
                    var c = this,
                        d = new WebSocket(c.getUrlForNode(a)),
                        e = !1;
                    d.addEventListener(
                        'message',
                        function(a) {
                            e || ((e = !0), b(null, JSON.parse(a.data), d));
                        },
                        { once: !0 }
                    ),
                        d.addEventListener(
                            'error',
                            function(a) {
                                e || ((e = !0), b(a));
                            },
                            { once: !0 }
                        ),
                        d.addEventListener(
                            'close',
                            function() {
                                e || ((e = !0), b({ error: 'websocket closed' }));
                            },
                            { once: !0 }
                        );
                },
                initialConnect: function(a) {
                    var b = this;
                    b.connectToNode(b.host, a);
                },
                tryAllNodes: function(a, b, c) {
                    var d = this,
                        e = !1,
                        f = function(d, f, g, h) {
                            if (!e) {
                                if (!d && g.isRecorderClientBrokerConnected)
                                    return (e = !0), (b[f] = !1), c(null, f, h);
                                b[f] = !0;
                                var i = Object.keys(b).length === a.length;
                                return i ? ((e = !0), c({ error: 'broker unreachable' })) : void 0;
                            }
                        };
                    a.forEach(function(a) {
                        b[a] ||
                            d.connectToNode(a, function(b, c, d) {
                                f(b, a, c, d);
                            });
                    });
                },
                connect: function(a) {
                    var b = this;
                    b.initialConnect(function(c, d, e) {
                        if (c) return a(c);
                        if (d.isRecorderClientBrokerConnected) return a(null, e);
                        var f = 1 === d.nodes.length;
                        if (f && !d.isRecorderClientBrokerConnected) return a({ error: 'broker unreachable' });
                        var g = {};
                        (g[d.node] = !0),
                            b.tryAllNodes(d.nodes, g, function(b, c, d) {
                                return b ? a(b) : a(null, d);
                            });
                    });
                },
            }),
            b
        );
    },
]);
