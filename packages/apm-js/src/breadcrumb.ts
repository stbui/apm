export class Breadcrumb {
    private type: string;
    private name: string;
    private metadata: any;
    private timestamp: Date;

    constructor(type?, name?, metadata?, timestamp = new Date()) {
        this.name = name;
        this.metadata = metadata;
        this.type = type;
        this.timestamp = timestamp;
    }

    toJSON() {
        return {
            type: this.type,
            name: this.name,
            timestamp: this.timestamp,
            metadata: this.metadata,
        };
    }
}
