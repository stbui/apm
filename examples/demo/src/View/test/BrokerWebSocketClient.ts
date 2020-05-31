class connectorService {
    public host;
    public path;

    constructor(host, path) {
        this.host = host;
        this.path = path;
    }

    getUrlForNode(a) {
        return a + this.path;
    }

    connectToNode(host, b) {
        var c = this,
            webSocket = new WebSocket(this.getUrlForNode(host)),
            e = false;

        webSocket.addEventListener(
            'message',
            function (a) {
                e || ((e = true), b(null, JSON.parse(a.data), d));
            },
            { once: true }
        );
        webSocket.addEventListener(
            'error',
            function (a) {
                if (!e) {
                    e = true;
                    b(a);
                }
            },
            { once: true }
        );
        webSocket.addEventListener(
            'close',
            function () {
                e || ((e = true), b({ error: 'websocket closed' }));
            },
            { once: true }
        );
    }

    initialConnect(callback) {
        this.connectToNode(this.host, callback);
    }

    tryAllNodes(nodes, b, callback) {
        var d = this,
            e = false,
            f = function (d, f, g, h) {
                if (!e) {
                    if (!d && g.isRecorderClientBrokerConnected)
                        return (e = true), (b[f] = false), callback(null, f, h);
                    b[f] = true;
                    var i = Object.keys(b).length === nodes.length;
                    return i ? ((e = true), callback({ error: 'broker unreachable' })) : void 0;
                }
            };
        nodes.forEach(function (a) {
            b[a] ||
                d.connectToNode(a, function (b, c, d) {
                    f(b, a, c, d);
                });
        });
    }

    connect(a) {
        var b = this;
        b.initialConnect(function (c, d, e) {
            if (c) return a(c);
            if (d.isRecorderClientBrokerConnected) return a(null, e);
            var f = 1 === d.nodes.length;
            if (f && !d.isRecorderClientBrokerConnected) return a({ error: 'broker unreachable' });
            var g = {};
            (g[d.node] = true),
                b.tryAllNodes(d.nodes, g, function (b, c, d) {
                    return b ? a(b) : a(null, d);
                });
        });
    }
}

class reconnectService {
    public client: BrokerWebSocketClient;
    public heartbeatInterval;
    public maxRetries;
    public retries: number;
    public interval;

    constructor(client, heartbeatInterval, maxRetries) {
        this.client = client;
        this.heartbeatInterval = heartbeatInterval;
        this.maxRetries = maxRetries;
        this.retries = 0;
        this.interval = null;
    }

    start() {
        this.interval = setInterval(() => {
            if (this.client.isConnecting() || this.client.isOpen()) {
                this.retries = 0;
            } else if (this.maxRetries !== -1 && this.retries > this.maxRetries) {
                this.stop();
            } else {
                this.retries += 1;
                this.client.reconnect();
            }

            // return this.client.isConnecting() || this.client.isOpen()
            //     ? void (this.retries = 0)
            //     : this.maxRetries !== -1 && this.retries > this.maxRetries
            //     ? void this.stop()
            //     : ((this.retries += 1), void this.client.reconnect());
        }, this.heartbeatInterval);
    }
    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.retries = 0;
    }
}

export class BrokerWebSocketClient {
    public eventListeners;
    public requestsQueue;
    public reconnectInProgress;
    public isDisconnected;
    public reconnectService: reconnectService;
    public connectorService: connectorService;

    public static DEFAULT_HEARTBEAT_INTERVAL = 2000;
    public static DEFAULT_AUTORECONNECT_RETRIES = -1;

    socket;

    constructor(host, path, f: any = {}) {
        this.eventListeners = [];
        this.requestsQueue = [];
        this.reconnectInProgress = false;
        this.isDisconnected = true;

        var heartbeatInterval = f.heartbeatInterval || BrokerWebSocketClient.DEFAULT_HEARTBEAT_INTERVAL;
        var maxRetries = f.retries || BrokerWebSocketClient.DEFAULT_AUTORECONNECT_RETRIES;

        this.reconnectService = new reconnectService(this, heartbeatInterval, maxRetries);
        this.connectorService = new connectorService(host, path);
    }

    static isSupported() {
        return !!window.WebSocket;
    }

    static createStreamingClient(sessionId): BrokerWebSocketClient {
        return new BrokerWebSocketClient(BROKER_URL, 'sender/session/' + sessionId);
    }
    static createChatClient(sessionId): BrokerWebSocketClient {
        return new BrokerWebSocketClient(BROKER_URL, 'player/chat/' + sessionId);
    }

    reconnect(a?) {
        a = a || function () {};

        return this.reconnectInProgress
            ? a()
            : ((this.reconnectInProgress = true),
              void this.connect(function (c) {
                  (this.reconnectInProgress = false), a(c);
              }));
    }

    connect(a) {
        var c = this;
        a = a || function (a) {};

        return BrokerWebSocketClient.isSupported()
            ? (c.reconnectService.stop(),
              (c.isDisconnected = false),
              void c.connectorService.connect(function (b, d) {
                  return c.isDisconnected
                      ? a()
                      : b
                      ? (c.reconnectService.start(), a(b))
                      : ((c.socket = d),
                        c.eventListeners.forEach(function (a) {
                            c.socket.addEventListener(a.type, a.listener);
                        }),
                        c.isOpen()
                            ? c.sendPendingRequests()
                            : c.socket.addEventListener(
                                  'open',
                                  function () {
                                      c.sendPendingRequests();
                                  },
                                  { once: true }
                              ),
                        c.reconnectService.start(),
                        void a());
              }))
            : a();
    }
    disconnect(callback: Function = function () {}) {
        if (!BrokerWebSocketClient.isSupported() || this.isDisconnected) {
            return callback();
        } else {
            this.reconnectService.stop();
            this.isDisconnected = true;
            this.socket && this.socket.close();
            this.socket = null;

            this.eventListeners = this.eventListeners.filter(function (a) {
                return !a.discardOnDisconnect;
            });

            return;
        }

        // return !BrokerWebSocketClient.isSupported() || c.isDisconnected
        //     ? a()
        //     : (c.reconnectService.stop(),
        //       (c.isDisconnected = true),
        //       c.socket && c.socket.close(),
        //       (c.socket = null),
        //       void (c.eventListeners = c.eventListeners.filter(function (a) {
        //           return !a.discardOnDisconnect;
        //       })));
    }
    send(a) {
        if (!this.isDisconnected) {
            return this.isOpen() ? this.socket.send(a) : this.requestsQueue.push(a);
        }
    }
    addEventListener(type: string, listener: Function, c = { discardOnDisconnect: false }) {
        this.eventListeners.push({
            type: type,
            listener: listener,
            discardOnDisconnect: c.discardOnDisconnect,
        });
        this.socket && this.socket.addEventListener(type, listener);
    }
    isOpen() {
        return !!this.socket && this.socket.readyState == WebSocket.OPEN;
    }
    isConnecting() {
        return !!this.socket && this.socket.readyState === WebSocket.CONNECTING;
    }
    sendPendingRequests() {
        this.requestsQueue.forEach(function (b) {
            this.socket.send(b);
        });
        this.requestsQueue = [];
    }
    discardPendingRequests() {
        this.requestsQueue = [];
    }
}
