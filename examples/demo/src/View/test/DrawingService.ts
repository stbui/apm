export class DrawingService {
    public client;

    constructor() {}

    connect(client) {
        this.client = client;
    }
    draw(a) {
        this.client.sendPath(a);
    }
    sendMouseMove(a, b, c, d) {
        this.client.sendMouseMove(a, b, c, d);
    }
    hoverElement(a, b, c) {
        this.client.sendHover(a, b, c);
    }
    scrollChange(a, b, c, d, e) {
        this.client.sendScrollChange(a, b, c, d, e);
    }
    click(a, b, c, d) {
        this.client.sendClick(a, b, c, d);
    }
    visualizeClick(a, b) {
        this.client.sendVisualizeClick(a, b);
    }
    visualizeMouseMove(a, b) {
        this.client.sendVisualizeMouseMove(a, b);
    }
    exitCursor() {
        this.client.sendExitCursor();
    }
    exitControlTakeOver() {
        this.client.sendExitControlTakeOver();
    }
    sendKeyStroke(a, b, c, d, e) {
        this.client.sendKeyStroke(a, b, c, d, e);
    }
    sendFocus(a, b, c) {
        this.client.sendFocus(a, b, c);
    }
}
