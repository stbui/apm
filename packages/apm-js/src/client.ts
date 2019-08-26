import { Breadcrumb } from './breadcrumb';
import { Report } from './report';

export abstract class ClientAbstract {
    abstract use(plugin);
    abstract notify(error, options, cb);
}

export class Client implements ClientAbstract {
    private _delivery: any;

    public device: any = undefined;
    public user: any = {};
    public breadcrumbs = [];
    public report: Report;
    public breadcrumb: Breadcrumb;
    public config;

    constructor() {
        this.breadcrumb = new Breadcrumb();
        this.report = new Report();
        this.config = {}
    }

    use(plugin) {
        plugin.init(this);
        return this;
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
