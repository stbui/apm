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

function IsReplayerType(id): boolean {
    return (
        0 == id ||
        2 == id ||
        4 == id ||
        5 == id ||
        6 == id ||
        7 == id ||
        8 == id ||
        9 == id ||
        10 == id ||
        11 == id ||
        12 == id ||
        13 == id ||
        14 == id ||
        15 == id ||
        16 == id ||
        18 == id ||
        19 == id ||
        20 == id ||
        22 == id ||
        37 == id ||
        38 == id ||
        39 == id ||
        40 == id ||
        41 == id ||
        44 == id ||
        45 == id ||
        46 == id ||
        47 == id ||
        48 == id ||
        49 == id ||
        54 == id ||
        55 == id ||
        59 == id ||
        69 == id ||
        70 == id ||
        90 == id ||
        93 == id ||
        96 == id ||
        100 == id ||
        102 == id ||
        103 == id ||
        105 == id
    );
}

function IsIOSType(id): boolean {
    return (
        107 == id ||
        90 == id ||
        91 == id ||
        92 == id ||
        93 == id ||
        94 == id ||
        95 == id ||
        96 == id ||
        97 == id ||
        98 == id ||
        99 == id ||
        100 == id ||
        101 == id ||
        102 == id ||
        103 == id ||
        104 == id ||
        105 == id ||
        110 == id ||
        111 == id
    );
}

export class Pipeline {
    public message: Array<any> = [];

    constructor(protected bufferMeta: Buffer, protected path: string) {}

    unpack(callback?: Function) {
        const messageReader = new MessageReader(this.bufferMeta, 0);

        let index = 0;
        while (messageReader.hasNext()) {
            const msg: any = ServiceReadMessage(messageReader);

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

        if (!IsReplayerType(msg.tp)) {
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