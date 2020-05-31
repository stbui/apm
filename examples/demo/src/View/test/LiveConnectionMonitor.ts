import { BrokerClient } from './BrokerClient';

const MAX_RECONNECT_RETRIES = 10;
const PERIODIC_CHECK_TIME = 1000;

export class LiveConnectionMonitor {
    public brokerClient: BrokerClient;
    public periodicTimerPromise;
    public lastConnectionStatus;
    public reconnectRetries: number;

    onStatusChangeCallback: Function;

    constructor(brokerClient: BrokerClient) {
        this.brokerClient = brokerClient;
        this.periodicTimerPromise = null;
        this.lastConnectionStatus = null;
        this.reconnectRetries = 0;
    }

    start() {
        var a = this;
        this.stop();
        this.periodicTimerPromise = $interval(function () {
            var b = a.brokerClient.isConnected();
            if (b) a.reconnectRetries = 0;
            else {
                if (a.reconnectRetries < MAX_RECONNECT_RETRIES) return a.reconnectRetries++;
                a.stop();
            }
            var d = b ? CONNECTION_STATUSES.ONLINE : CONNECTION_STATUSES.OFFLINE;
            a.lastConnectionStatus !== d &&
                ((a.reconnectRetries = 0), (a.lastConnectionStatus = d), a.onStatusChangeCallback(d));
        }, PERIODIC_CHECK_TIME);
    }

    stop() {
        $interval.cancel(this.periodicTimerPromise);
        this.periodicTimerPromise = null;
        this.lastConnectionStatus = null;
        this.reconnectRetries = 0;
    }

    onStatusChange(a) {
        this.onStatusChangeCallback = a;
    }
}
