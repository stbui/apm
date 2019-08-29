export class Report {
    metaData = {};
    device = undefined;
    user = undefined;
    request = undefined;
    breadcrumbs = [];

    errorClass = '[no error class]';
    errorMessage = '[no error message]';
    stacktrace = [];
    severity = undefined;
    originalError = undefined;

    context = undefined;

    constructor() {}

    create(
        errorClass,
        errorMessage,
        stacktrace = [],
        handledState,
        originalError
    ) {
        this.errorClass = errorClass;
        this.errorMessage = errorMessage;
        this.stacktrace = stacktrace;
        this.severity = handledState;
        this.originalError = originalError;

        return this;
    }

    updateMetaData(section, ...args) {
        let updates;

        if (args[0] === null) return this.removeMetaData(section);
        if (typeof args[0] === 'object') updates = args[0];

        if (!updates) return this;

        if (!this.metaData[section]) this.metaData[section] = {};

        this.metaData[section] = { ...this.metaData[section], ...updates };

        return this;
    }

    removeMetaData(section, property?) {}

    toJSON() {
        return {
            payloadVersion: '1',
            exceptions: [
                {
                    errorClass: this.errorClass,
                    message: this.errorMessage,
                    stacktrace: this.stacktrace,
                    type: 'browserjs',
                },
            ],
            device: this.device,
            breadcrumbs: this.breadcrumbs,
            user: this.user,
            request: this.request,
        };
    }
}
