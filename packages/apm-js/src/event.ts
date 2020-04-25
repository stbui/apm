export class Event {
    metaData = {};
    device = undefined;
    user = undefined;
    request = undefined;
    app = undefined;
    breadcrumbs = [];

    errorClass = '[no error class]';
    errorMessage = '[no error message]';
    stacktrace = [];
    severity = undefined;
    originalError = undefined;

    context = undefined;

    constructor() {}

    create(errorClass, errorMessage, stacktrace = [], handledState, originalError) {
        // 错误类型
        this.errorClass = errorClass;
        // 错误信息
        this.errorMessage = errorMessage;
        // 错误信息
        this.stacktrace = stacktrace;
        // 严重程度
        this.severity = handledState;
        this.originalError = originalError;

        return this;
    }

    updateMetaData(section, updates) {
        if (!this.metaData[section]) {
            this.metaData[section] = {};
        }

        if (typeof updates !== 'object') {
            return this;
        }

        this.metaData[section] = { ...this.metaData[section], ...updates };

        return this;
    }

    removeMetaData(section, property?) {
        if (this.metaData[section]) {
            if (property && this.metaData[section][property]) {
                this.metaData[section][property] = undefined;
                delete this.metaData[section][property];
            } else {
                this.metaData[section] = {};
                delete this.metaData[section];
            }
        }

        return this;
    }

    /**
     * JSON.stringify() 将值转换为相应的JSON格式
     * 将被序列化的值
     */
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
