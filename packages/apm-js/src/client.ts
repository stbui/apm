import { config } from './config';
import { Breadcrumb } from './breadcrumb';
import { Report } from './report';

export class Client {
    private _plugins: any = {};
    private _configure: any = config;
    private _delivery: any;

    public device: any = undefined;
    public user: any = {};
    public breadcrumb = Breadcrumb;
    public breadcrumbs = [];
    public report = Report;

    constructor(options?) {}

    configure() {
        return this;
    }

    use(plugin, ...args) {
        const result = plugin.init(this, ...args);

        if (plugin.name) {
            this._plugins[`~${plugin.name}~`] = result;
        }

        return this;
    }

    getPlugin(name: string) {
        return this._plugins[`~${name}~`];
    }

    delivery(d) {
        this._delivery = d(this);
        return this;
    }

    leaveBreadcrumb(name, metaData, type, timestamp) {
        const crumb = new Breadcrumb(name, metaData, type, timestamp);

        this.breadcrumbs.push(crumb);

        return this;
    }

    notify(error, options = {}, cb) {
        const report: any = new Report(
            error.errorClass,
            error.errorMessage,
            error.stacktrace
        );

        report.device = this.device;
        report.user = { name: 'stbui' };
        report.breadcrumbs = this.breadcrumbs;

        report.exceptions = {};

        this._delivery.sendReport({
            apiKey: 'stbui',
            notifier: {},
            events: report,
        });
    }
}
