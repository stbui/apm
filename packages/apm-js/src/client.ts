import { Breadcrumb } from './breadcrumb';
import { Event } from './event';
import { Kernal } from './kernel';
import { Queue } from './queue';

export class Client extends Kernal {
    private _delivery: any;
    private _queue: Queue = new Queue();

    public device: any = undefined;
    public user: any = {};
    public breadcrumbs = [];
    public event: Event = new Event();
    public breadcrumb: any;

    constructor(options?) {
        super(options);

        this.breadcrumb = Breadcrumb;

        this.onSession();
        this.onNotify();
    }

    onNotify() {
        this.dispatcher.on('notify', data => {
            this.notify(data);
        });
    }

    report(data) { this.dispatcher.dispatch('notify', data); }

    onSession() {
        this.dispatcher.on('session', event => {
            this.device = event;
        });
    }

    delivery(request) {
        this._delivery = new request(this.config.endpoint, this.config.apiKey);
        return this;
    }

    captureException(error) {
        const event = {
            errorClass: error,
            errorMessage: error,
            severity: 'customEvent',
            unhandled: true,
            severityReason: { type: 'customEvent' },
        };

        this.dispatcher.dispatch('notify', event);
    }

    captureMessage(event) {
        this.dispatcher.dispatch('notify', event);
    }

    captureBreadcrumb() { }

    getUser() {
        return this.config.user;
    }

    setUser(id: string | number, email: string, name: string) {
        return (this.config.user = { id, email, name });
    }

    send(data) {
        this._delivery.send(data);
        this._queue.clear();
    }

    notify(event) {
        const events = {
            exceptions: event,
            device: this.device,
            user: this.getUser(),
            breadcrumbs: this.breadcrumbs,
            releaseStage: this.appVersion(),
        };

        this.send({
            apiKey: this.config.apiKey,
            events: events,
            notifier: {
                name: this.config.sdk_name,
                version: this.config.sdk_version,
                url: 'https://github.com/stbui/apm',
            },
        });
    }

    appVersion() {
        return this.config.releaseStage;
    }
}
