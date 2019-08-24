export class Breadcrumb {
    private type: string;
    private name: string;
    private metaData: any;
    private timestamp: string;

    constructor(
        name = '[anonymous]',
        metaData = {},
        type = 'manual',
        timestamp = new Date().toJSON()
    ) {
        this.type = type;
        this.name = name;
        this.metaData = metaData;
        this.timestamp = timestamp;
    }

    toJSON() {
        return {
            type: this.type,
            name: this.name,
            timestamp: this.timestamp,
            metaData: this.metaData,
        };
    }
}
