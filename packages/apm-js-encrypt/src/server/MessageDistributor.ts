import MFileReader from './MFileReader';

export class MessageDistributor {
    private fileReader: MFileReader;
    private sessionStart: number;

    constructor() {}

    readAndDistributeMessages(byteArray: Uint8Array) {
        const msgs: Array<any> = [];

        if (!this.fileReader) {
            this.fileReader = new MFileReader(new Uint8Array(), this.sessionStart);
        }

        this.fileReader.append(byteArray);

        let next: ReturnType<MFileReader['next']>;

        this.fileReader.hasNextByte()

        while ((next = this.fileReader.next())) {
            const [msg, index] = next;
            msgs.push(msg);
        }

        return msgs;
    }
}
