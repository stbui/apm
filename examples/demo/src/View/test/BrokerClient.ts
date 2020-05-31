import { BrokerWebSocketClient } from './BrokerWebSocketClient';

class DataConsumer {
    public firstSnapshotAdded;
    public bufferedData;
    public onAddDataListeners;

    constructor() {
        this.firstSnapshotAdded = false;
        this.bufferedData = [];
        this.onAddDataListeners = [];
    }

    reset() {
        this.firstSnapshotAdded = false;
        this.onAddDataListeners = [];
        this.bufferedData = [];
    }
    addData(a) {
        var b = this;
        a.forEach(function (a) {
            b.consume(a);
        });
        b.onAddDataListeners.forEach(function (a) {
            a(b.bufferedData);
        });
        b.bufferedData = [];
    }
    consume(a) {
        this.firstSnapshotAdded ||
            a.type !== EVENT_TYPE.DOM_SNAPSHOT ||
            ((this.firstSnapshotAdded = true), (a.isFirstLiveActivity = true)),
            this.firstSnapshotAdded && this.bufferedData.push(a);
    }
    onAddData(a) {
        this.onAddDataListeners.push(a);
    }
}

export class BrokerClient {
    public websocketClient: BrokerWebSocketClient;
    public dataConsumer: DataConsumer;
    public streamingRequestDeniedListeners;
    public streamingRequestApprovedListeners;
    public recorderDisconnectedListeners;
    public controlTakeOverRequestApprovedListeners;
    public controlTakeOverRequestDeniedListeners;
    public controlTakeOverStoppedListeners;

    public static EVENTS = {
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
    };

    constructor(websocketClient: BrokerWebSocketClient) {
        var b = this;
        this.websocketClient = websocketClient;
        this.dataConsumer = new DataConsumer();
        this.streamingRequestDeniedListeners = [];
        this.streamingRequestApprovedListeners = [];
        this.recorderDisconnectedListeners = [];
        this.controlTakeOverRequestApprovedListeners = [];
        this.controlTakeOverRequestDeniedListeners = [];
        this.controlTakeOverStoppedListeners = [];

        this.websocketClient.addEventListener('message', function (a) {
            var c = JSON.parse(a.data);
            switch (c.type) {
                case BrokerClient.EVENTS.ADD_DATA:
                    b.dataConsumer.addData(c.data);
                    break;
                case BrokerClient.EVENTS.STREAMING_REQUEST_DENIED:
                    b.streamingRequestDeniedListeners.forEach(function (a) {
                        a.call(b);
                    });
                    break;
                case BrokerClient.EVENTS.STREAMING_REQUEST_APPROVED:
                    b.streamingRequestApprovedListeners.forEach(function (a) {
                        a.call(b);
                    });
                    break;
                case BrokerClient.EVENTS.RECORDER_DISCONNECTED:
                    b.recorderDisconnectedListeners.forEach(function (a) {
                        a.call(b);
                    });
                    break;
                case BrokerClient.EVENTS.CONTROL_TAKE_OVER_APPROVED:
                    b.controlTakeOverRequestApprovedListeners.forEach(function (a) {
                        a.call(b);
                    });
                    break;
                case BrokerClient.EVENTS.CONTROL_TAKE_OVER_DENIED:
                    b.controlTakeOverRequestDeniedListeners.forEach(function (a) {
                        a.call(b);
                    });
                    break;
                case BrokerClient.EVENTS.CONTROL_TAKE_OVER_STOPPED:
                    b.controlTakeOverStoppedListeners.forEach(function (a) {
                        a.call(b);
                    });
            }
        });
    }

    connect(a) {
        this.websocketClient.connect(a);
    }
    disconnect() {
        this.streamingRequestDeniedListeners = [];
        this.streamingRequestApprovedListeners = [];
        this.recorderDisconnectedListeners = [];
        this.dataConsumer.reset();
        this.websocketClient.disconnect();
    }
    isConnected() {
        return this.websocketClient.isOpen();
    }
    discardPendingRequests() {
        this.websocketClient.discardPendingRequests();
    }
    onAddData(a) {
        this.dataConsumer.onAddData(a);
    }
    onStreamingRequestDenied(a) {
        this.streamingRequestDeniedListeners.push(a);
    }
    onStreamingRequestApproved(a) {
        this.streamingRequestApprovedListeners.push(a);
    }
    onControlTakeOverRequestApproved(callback: Function) {
        this.controlTakeOverRequestApprovedListeners.push(callback);
    }
    onControlTakeOverRequestDenied(callback: Function) {
        this.controlTakeOverRequestDeniedListeners.push(callback);
    }
    onControlTakeOverRequestStopped(callback: Function) {
        this.controlTakeOverStoppedListeners.push(callback);
    }
    onRecorderDisconnected(a) {
        this.recorderDisconnectedListeners.push(a);
    }
    sendJSON(params) {
        this.websocketClient.send(JSON.stringify(params));
    }
    sendStreamingRequest() {
        this.sendJSON({ type: BrokerClient.EVENTS.STREAMING_REQUEST });
    }
    sendStreamingRequestCanceled() {
        this.sendJSON({ type: BrokerClient.EVENTS.STREAMING_REQUEST_CANCELED });
    }
    sendControlTakeOverRequest() {
        this.sendJSON({ type: BrokerClient.EVENTS.CONTROL_TAKE_OVER_REQUEST });
    }
    sendPath(path) {
        this.sendJSON({ type: BrokerClient.EVENTS.PATH, path: path });
    }
    sendHover(nodeId, frameElementId, hostElementId) {
        this.sendJSON({
            type: BrokerClient.EVENTS.HOVER,
            nodeId: nodeId,
            frameElementId: frameElementId,
            hostElementId: hostElementId,
        });
    }
    sendMouseMove(a, nodeId, frameElementId, hostElementId) {
        this.sendJSON({
            type: BrokerClient.EVENTS.MOUSE_MOVE,
            x: a.clientX,
            y: a.clientY,
            nodeId: nodeId,
            frameElementId: frameElementId,
            hostElementId: hostElementId,
        });
    }
    sendScrollChange(deltaX, deltaY, nodeId, frameElementId, hostElementId) {
        this.sendJSON({
            type: BrokerClient.EVENTS.SCROLL_CHANGE,
            deltaX: deltaX,
            deltaY: deltaY,
            nodeId: nodeId,
            frameElementId: frameElementId,
            hostElementId: hostElementId,
        });
    }
    sendClick(x, y, elementId, frameElementId) {
        this.sendJSON({
            type: BrokerClient.EVENTS.CLICK,
            x: x,
            y: y,
            elementId: elementId,
            frameElementId: frameElementId,
        });
    }
    sendVisualizeClick(a, b) {
        this.sendJSON({ type: BrokerClient.EVENTS.VISUALIZE_CLICK, x: a, y: b });
    }
    sendVisualizeMouseMove(x, y) {
        this.sendJSON({ type: BrokerClient.EVENTS.VISUALIZE_MOUSE_MOVE, x: x, y: y });
    }
    sendExitCursor() {
        this.sendJSON({ type: BrokerClient.EVENTS.EXIT_CURSOR });
    }
    sendExitControlTakeOver() {
        this.sendJSON({ type: BrokerClient.EVENTS.EXIT_CONTROL_TAKE_OVER });
    }
    sendKeyStroke(text, nodeId, frameElementId, hostElementId, keyStrokeMetaData) {
        this.sendJSON({
            type: BrokerClient.EVENTS.KEY_STROKE,
            text: text,
            nodeId: nodeId,
            frameElementId: frameElementId,
            hostElementId: hostElementId,
            keyStrokeMetaData: keyStrokeMetaData,
        });
    }
    sendFocus(nodeId, frameElementId, hostElementId) {
        this.sendJSON({
            type: BrokerClient.EVENTS.FOCUS_ELEMENT,
            nodeId: nodeId,
            frameElementId: frameElementId,
            hostElementId: hostElementId,
        });
    }
}
