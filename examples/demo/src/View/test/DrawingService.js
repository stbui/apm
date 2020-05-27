angular.module('playerApp').factory('DrawingService', [
    'BrokerWebSocketClient',
    'BROKER_URL',
    function(a, b) {
        var c = function() {};
        return (
            (c.prototype.connect = function(a) {
                this.client = a;
            }),
            (c.prototype.draw = function(a) {
                this.client.sendPath(a);
            }),
            (c.prototype.sendMouseMove = function(a, b, c, d) {
                this.client.sendMouseMove(a, b, c, d);
            }),
            (c.prototype.hoverElement = function(a, b, c) {
                this.client.sendHover(a, b, c);
            }),
            (c.prototype.scrollChange = function(a, b, c, d, e) {
                this.client.sendScrollChange(a, b, c, d, e);
            }),
            (c.prototype.click = function(a, b, c, d) {
                this.client.sendClick(a, b, c, d);
            }),
            (c.prototype.visualizeClick = function(a, b) {
                this.client.sendVisualizeClick(a, b);
            }),
            (c.prototype.visualizeMouseMove = function(a, b) {
                this.client.sendVisualizeMouseMove(a, b);
            }),
            (c.prototype.exitCursor = function() {
                this.client.sendExitCursor();
            }),
            (c.prototype.exitControlTakeOver = function() {
                this.client.sendExitControlTakeOver();
            }),
            (c.prototype.sendKeyStroke = function(a, b, c, d, e) {
                this.client.sendKeyStroke(a, b, c, d, e);
            }),
            (c.prototype.sendFocus = function(a, b, c) {
                this.client.sendFocus(a, b, c);
            }),
            c
        );
    },
]);
