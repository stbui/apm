
export class OnError {

    private instance: any

    constructor(client) {
        this.instance = client
    }

    catch() {
        window.onerror = (messageOrEvent, url, lineNo, charNo, error) => {
            console.log(messageOrEvent, url, lineNo, charNo, error)
            this.instance.notify(messageOrEvent, url, lineNo, charNo, error)
        };
    }
}
