export class OpenReplayEncoder {
    offset = 0;
    checkpointOffset = 0;
    data;

    constructor(protected size) {
        this.data = Buffer.alloc(this.size);
    }

    checkpoint() {
        this.checkpointOffset = this.offset;
    }

    isEmpty() {
        return this.offset === 0;
    }

    boolean(value) {
        this.data[this.offset++] = +value;
        return this.offset <= this.size;
    }

    uint(value) {
        if (value < 0 || value > Number.MAX_SAFE_INTEGER) {
            value = 0;
        }
        while (value >= 128) {
            this.data[this.offset++] = value % 256 | 128;
            value = Math.floor(value / 128);
        }
        this.data[this.offset++] = value;
        return this.offset <= this.size;
    }

    int(value) {
        value = Math.round(value);
        return this.uint(value >= 0 ? value * 2 : value * -2 - 1);
    }

    string(value) {
        const encoded = Buffer.from(value);
        const length = encoded.byteLength;
        if (!this.uint(length) || this.offset + length > this.size) {
            return false;
        }

        encoded.copy(this.data, this.offset);
        this.offset += length;
        return true;
    }

    reset() {
        this.offset = 0;
        this.checkpointOffset = 0;
    }

    flush() {
        const data = this.data.slice(0, this.checkpointOffset);
        this.reset();
        return this.data;
    }
}
