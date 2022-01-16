export class OpenReplayDecoder {
    protected p = 0;

    constructor(protected readonly buf) {}

    hasNext() {
        return this.p < this.buf.length;
    }

    readUint() {
        let r = 0;
        let s = 1;
        let b;

        do {
            b = this.buf[this.p++];
            r += (b & 127) * s;
            s *= 128;
        } while (b >= 128);
        return r;
    }

    readInt() {
        let u = this.readUint();
        if (u % 2) {
            u = (u + 1) / -2;
        } else {
            u = u / 2;
        }
        return u;
    }

    readString() {
        const l = this.readUint();

        const buf = this.buf.slice(this.p, (this.p += l));
        return buf.toString();
    }

    readBoolean() {
        return !!this.buf[this.p++];
    }

    skip(n) {
        this.p += n;
    }
}
