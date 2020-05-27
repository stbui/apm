angular.module('playerApp').factory('BrokerClient', [
    'lodash',
    'EVENT_TYPE',
    function(a, b) {
        function c() {
            (this.firstSnapshotAdded = !1), (this.bufferedData = []), (this.onAddDataListeners = []);
        }
        function d(a) {
            var b = this;
            (b.websocketClient = a),
                (b.dataConsumer = new c()),
                (b.streamingRequestDeniedListeners = []),
                (b.streamingRequestApprovedListeners = []),
                (b.recorderDisconnectedListeners = []),
                (b.controlTakeOverRequestApprovedListeners = []),
                (b.controlTakeOverRequestDeniedListeners = []),
                (b.controlTakeOverStoppedListeners = []),
                b.websocketClient.addEventListener('message', function(a) {
                    var c = JSON.parse(a.data);
                    switch (c.type) {
                        case d.EVENTS.ADD_DATA:
                            b.dataConsumer.addData(c.data);
                            break;
                        case d.EVENTS.STREAMING_REQUEST_DENIED:
                            b.streamingRequestDeniedListeners.forEach(function(a) {
                                a.call(b);
                            });
                            break;
                        case d.EVENTS.STREAMING_REQUEST_APPROVED:
                            b.streamingRequestApprovedListeners.forEach(function(a) {
                                a.call(b);
                            });
                            break;
                        case d.EVENTS.RECORDER_DISCONNECTED:
                            b.recorderDisconnectedListeners.forEach(function(a) {
                                a.call(b);
                            });
                            break;
                        case d.EVENTS.CONTROL_TAKE_OVER_APPROVED:
                            b.controlTakeOverRequestApprovedListeners.forEach(function(a) {
                                a.call(b);
                            });
                            break;
                        case d.EVENTS.CONTROL_TAKE_OVER_DENIED:
                            b.controlTakeOverRequestDeniedListeners.forEach(function(a) {
                                a.call(b);
                            });
                            break;
                        case d.EVENTS.CONTROL_TAKE_OVER_STOPPED:
                            b.controlTakeOverStoppedListeners.forEach(function(a) {
                                a.call(b);
                            });
                    }
                });
        }
        return (
            (c.prototype = {
                reset: function() {
                    (this.firstSnapshotAdded = !1), (this.onAddDataListeners = []), (this.bufferedData = []);
                },
                addData: function(a) {
                    var b = this;
                    a.forEach(function(a) {
                        b.consume(a);
                    }),
                        b.onAddDataListeners.forEach(function(a) {
                            a(b.bufferedData);
                        }),
                        (b.bufferedData = []);
                },
                consume: function(a) {
                    this.firstSnapshotAdded ||
                        a.type !== b.DOM_SNAPSHOT ||
                        ((this.firstSnapshotAdded = !0), (a.isFirstLiveActivity = !0)),
                        this.firstSnapshotAdded && this.bufferedData.push(a);
                },
                onAddData: function(a) {
                    this.onAddDataListeners.push(a);
                },
            }),
            (d.EVENTS = {
                PATH: 'path',
                HOVER: 'hover',
                MOUSE_MOVE: 'mouseMove',
                SCROLL_CHANGE: 'scrollChange',
                CLICK: 'click',
                VISUALIZE_CLICK: 'visualizeClick',
                VISUALIZE_MOUSE_MOVE: 'visualizeMouseMove',
                EXIT_CURSOR: 'exitCursor',
                EXIT_CONTROL_TAKE_OVER: 'exitControlTakeOver',
                ADD_DATA: 'addData',
                STREAMING_REQUEST: 'streamingRequest',
                STREAMING_REQUEST_DENIED: 'streamingRequestDenied',
                STREAMING_REQUEST_APPROVED: 'streamingRequestApproved',
                STREAMING_REQUEST_CANCELED: 'streamingRequestCanceled',
                CONTROL_TAKE_OVER_REQUEST: 'controlTakeOverRequest',
                CONTROL_TAKE_OVER_APPROVED: 'controlTakeOverApproved',
                CONTROL_TAKE_OVER_DENIED: 'controlTakeOverDenied',
                CONTROL_TAKE_OVER_STOPPED: 'controlTakeOverStopped',
                RECORDER_DISCONNECTED: 'recorderDisconnected',
                KEY_STROKE: 'keyStroke',
                FOCUS_ELEMENT: 'focusElement',
            }),
            (d.prototype = {
                connect: function(a) {
                    this.websocketClient.connect(a);
                },
                disconnect: function() {
                    (this.streamingRequestDeniedListeners = []),
                        (this.streamingRequestApprovedListeners = []),
                        (this.recorderDisconnectedListeners = []),
                        this.dataConsumer.reset(),
                        this.websocketClient.disconnect();
                },
                isConnected: function() {
                    return this.websocketClient.isOpen();
                },
                discardPendingRequests: function() {
                    this.websocketClient.discardPendingRequests();
                },
                onAddData: function(a) {
                    this.dataConsumer.onAddData(a);
                },
                onStreamingRequestDenied: function(a) {
                    this.streamingRequestDeniedListeners.push(a);
                },
                onStreamingRequestApproved: function(a) {
                    this.streamingRequestApprovedListeners.push(a);
                },
                onControlTakeOverRequestApproved: function(a) {
                    this.controlTakeOverRequestApprovedListeners.push(a);
                },
                onControlTakeOverRequestDenied: function(a) {
                    this.controlTakeOverRequestDeniedListeners.push(a);
                },
                onControlTakeOverRequestStopped: function(a) {
                    this.controlTakeOverStoppedListeners.push(a);
                },
                onRecorderDisconnected: function(a) {
                    this.recorderDisconnectedListeners.push(a);
                },
                sendJSON: function(a) {
                    this.websocketClient.send(JSON.stringify(a));
                },
                sendStreamingRequest: function() {
                    this.sendJSON({ type: d.EVENTS.STREAMING_REQUEST });
                },
                sendStreamingRequestCanceled: function() {
                    this.sendJSON({ type: d.EVENTS.STREAMING_REQUEST_CANCELED });
                },
                sendControlTakeOverRequest: function() {
                    this.sendJSON({ type: d.EVENTS.CONTROL_TAKE_OVER_REQUEST });
                },
                sendPath: function(a) {
                    this.sendJSON({ type: d.EVENTS.PATH, path: a });
                },
                sendHover: function(a, b, c) {
                    this.sendJSON({
                        type: d.EVENTS.HOVER,
                        nodeId: a,
                        frameElementId: b,
                        hostElementId: c,
                    });
                },
                sendMouseMove: function(a, b, c, e) {
                    this.sendJSON({
                        type: d.EVENTS.MOUSE_MOVE,
                        x: a.clientX,
                        y: a.clientY,
                        nodeId: b,
                        frameElementId: c,
                        hostElementId: e,
                    });
                },
                sendScrollChange: function(a, b, c, e, f) {
                    this.sendJSON({
                        type: d.EVENTS.SCROLL_CHANGE,
                        deltaX: a,
                        deltaY: b,
                        nodeId: c,
                        frameElementId: e,
                        hostElementId: f,
                    });
                },
                sendClick: function(a, b, c, e) {
                    this.sendJSON({
                        type: d.EVENTS.CLICK,
                        x: a,
                        y: b,
                        elementId: c,
                        frameElementId: e,
                    });
                },
                sendVisualizeClick: function(a, b) {
                    this.sendJSON({ type: d.EVENTS.VISUALIZE_CLICK, x: a, y: b });
                },
                sendVisualizeMouseMove: function(a, b) {
                    this.sendJSON({ type: d.EVENTS.VISUALIZE_MOUSE_MOVE, x: a, y: b });
                },
                sendExitCursor: function() {
                    this.sendJSON({ type: d.EVENTS.EXIT_CURSOR });
                },
                sendExitControlTakeOver: function() {
                    this.sendJSON({ type: d.EVENTS.EXIT_CONTROL_TAKE_OVER });
                },
                sendKeyStroke: function(a, b, c, e, f) {
                    this.sendJSON({
                        type: d.EVENTS.KEY_STROKE,
                        text: a,
                        nodeId: b,
                        frameElementId: c,
                        hostElementId: e,
                        keyStrokeMetaData: f,
                    });
                },
                sendFocus: function(a, b, c) {
                    this.sendJSON({
                        type: d.EVENTS.FOCUS_ELEMENT,
                        nodeId: a,
                        frameElementId: b,
                        hostElementId: c,
                    });
                },
            }),
            d
        );
    },
]);
