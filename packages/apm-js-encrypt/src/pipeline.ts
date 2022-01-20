import fs from 'fs';
import MessageReader from './MessageReader';
import ServiceReadMessage from './ServiceReadMessage';
import PrimitiveReader from './PrimitiveReader';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';

function to64Int(value) {
    const buffer = Buffer.alloc(8);
    let offset = 0;

    while (value >= 255) {
        buffer[offset++] = value % 255 | 0;
        value = Math.floor(value / 255);
    }
    buffer[offset++] = value;

    return buffer;
}

export class Pipeline {
    public message: Array<any> = [];

    constructor(protected bufferMeta: Buffer, protected path: string) {}

    unpack(callback?: Function) {
        const messageReader = new MessageReader(this.bufferMeta, 0);

        let index = 0;
        while (messageReader.hasNext()) {
            const msg = ServiceReadMessage(messageReader);

            msg.index = index;
            this.pack(msg);
            callback && callback(msg);

            index++;
        }
    }

    pack(msg: any) {
        //
        if (msg.tp === 80) {
            return;
        }

        const data = ServiceEnCodeMessage(msg);

        const buf = Buffer.from(data);
        const dataBlock = this.resetBlock(buf, msg.index);
        this.write(dataBlock);
    }

    resetBlock(data, index): Buffer {
        const serialNubmerBuffer = to64Int(index);
        return Buffer.concat([serialNubmerBuffer, data]);
    }

    write(data) {
        fs.appendFileSync(this.path, data, { encoding: 'binary' });
    }
}
