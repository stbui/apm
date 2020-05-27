angular
    .module('playerApp')
    .constant('MAX_RECONNECT_RETRIES', 10)
    .constant('PERIODIC_CHECK_TIME', 1e3)
    .factory('LiveConnectionMonitor', [
        '$timeout',
        '$interval',
        'MAX_RECONNECT_RETRIES',
        'PERIODIC_CHECK_TIME',
        'CONNECTION_STATUSES',
        function(a, b, c, d, e) {
            var f = function(a) {
                (this.brokerClient = a),
                    (this.periodicTimerPromise = null),
                    (this.lastConnectionStatus = null),
                    (this.reconnectRetries = 0);
            };
            return (
                (f.prototype.start = function() {
                    var a = this;
                    this.stop(),
                        (this.periodicTimerPromise = b(function() {
                            var b = a.brokerClient.isConnected();
                            if (b) a.reconnectRetries = 0;
                            else {
                                if (a.reconnectRetries < c) return a.reconnectRetries++;
                                a.stop();
                            }
                            var d = b ? e.ONLINE : e.OFFLINE;
                            a.lastConnectionStatus !== d &&
                                ((a.reconnectRetries = 0), (a.lastConnectionStatus = d), a.onStatusChangeCallback(d));
                        }, d));
                }),
                (f.prototype.stop = function() {
                    b.cancel(this.periodicTimerPromise),
                        (this.periodicTimerPromise = null),
                        (this.lastConnectionStatus = null),
                        (this.reconnectRetries = 0);
                }),
                (f.prototype.onStatusChange = function(a) {
                    this.onStatusChangeCallback = a;
                }),
                f
            );
        },
    ]);
