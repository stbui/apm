
export class BrowserDevice {
    private instance: any

    constructor(client) {
        this.instance = client

        this.getDevice();
    }

    getDevice() {
        const navigator: Navigator = window.navigator;
        const device = {
            local: navigator.language,
            userAgent: navigator.userAgent,
        };

        this.instance.device = { ...device, ...this.instance.device };
    }
}