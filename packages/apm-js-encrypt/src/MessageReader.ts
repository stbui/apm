import readMessage, { Message } from './messages';
import PrimitiveReader from './PrimitiveReader';

export default class MessageReader extends PrimitiveReader {
    private pLastMessageID: number = 0;
    private currentTime: number = 0;
    public error: boolean = false;
    constructor(data: Uint8Array, private readonly startTime: number) {
        super(data);
    }

    private readMessage(): Message | null {
        this.skip(8);
        try {
            let msg;
            msg = readMessage(this);
            return msg;
        } catch (e) {
            this.error = true;
            // logger.error("Read message error:", e);
            return null;
        }
    }

    hasNext(): boolean {
        return !this.error && this.buf.length > this.p;
    }

    next() {
        if (!this.hasNext()) {
            return null;
        }

        // while (this.needSkipMessage()) {
        //     this.readMessage();
        // }
        this.pLastMessageID = this.p;

        const msg = this.readMessage();
        if (!msg) {
            return null;
        }

        if (msg.tp === 'timestamp') {
            // if (this.startTime == null) {
            // 	this.startTime = msg.timestamp
            // }
            this.currentTime = msg.timestamp - this.startTime;
        } else {
            const tMsg = Object.assign(msg, {
                time: this.currentTime,
                _index: this.pLastMessageID,
            });
            return [tMsg, this.pLastMessageID];
        }
        return null;
    }
}
