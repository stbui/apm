import fs from 'fs';
import MessageReader from './MessageReader';
import ServiceReadMessage from './ServiceReadMessage';
import PrimitiveReader from './PrimitiveReader';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';

function to64Int(value) {
    const buffer = Buffer.alloc(8);
    let offset = 0;

    while (value >= 0x80) {
        buffer[offset++] = value % 0x100 | 0x80;
        value = Math.floor(value / 128);
    }
    buffer[offset++] = value;

    return buffer;
}

export class Pipeline {
    public message: Array<any> = [];

    constructor(protected bufferMeta: Buffer, protected path: string) {}

    unpack(callback) {
        const messageReader = new MessageReader(this.bufferMeta, 0);

        let index = 0;
        while (messageReader.hasNext()) {
            const msg = ServiceReadMessage(messageReader);

            msg.index = index;
            this.pack(msg);
            callback(msg);

            index++;
        }
    }

    pack(msg: any) {
        const data = ServiceEnCodeMessage(msg);
        const buf = Buffer.from(data);
        const dataBlock = this.resetBlock(buf, msg.index);
        this.write(dataBlock);
    }

    resetBlock(data, index): Buffer {
        const size = data.length + 8;
        const buffer = Buffer.allocUnsafe(size);
        buffer.writeInt32BE(12);

        data.copy(buffer, 8);

        // const buf = Buffer.allocUnsafe(8);
        // buf.writeInt32BE(123);
        // buffer.copy(buf);

        return buffer;
    }

    write(data) {
        fs.writeFileSync(this.path, data);
    }
}
