export class OnError {
    constructor() {}

    catch() {
        window.onerror = (messageOrEvent, url, lineNo, charNo, error) => {};
    }
}
