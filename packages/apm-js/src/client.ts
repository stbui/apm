import { Breadcrumb } from './breadcrumb';
import { Report } from './report';

export class Client {
    private _plugins: any = {};
    private _delivery: any;

    public device: any = undefined;
    public user: any = {};
    public breadcrumbs = [];
    public report: Report;
    public breadcrumb: Breadcrumb;

    constructor() {
        this.breadcrumb = new Breadcrumb();
        this.report = new Report();
    }

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

    notify(error, options = {}, cb) {
        const report: any = this.report.create(
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
