import { Breadcrumb } from './breadcrumb';
import { Report } from './report';
import { Config } from './config';

export abstract class ClientAbstract {
    abstract register(plugin);
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

    constructor(options?) {
        this.breadcrumb = new Breadcrumb();
        this.report = new Report();
        this.config = Config;
    }

    register(plugin) {
        new plugin(this);
        return this;
    }

    delivery(request) {
        this._delivery = new request(this.config.url, this.config.apiKey);
        return this;
    }

    notify(error, options = {}, cb) {
        const report: any = this.report.create(
            error.errorClass,
            error.errorMessage,
            error.stacktrace,
            error.severity,
            error.originalError
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
