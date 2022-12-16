import fs from 'fs';
import { MessageDistributor } from './server';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';
import { to64Int } from './pipeline';

export class ReceiveBuffer {
    private ignoreMessage = ['batch_metadata', 'user_id', 'resource_timing', 'page_load_timing', 'page_render_timing'];

    projectId: string;
    sessionId: number;

    private storePath: string;

    constructor(protected config) {}

    private encode(msg) {
        const data = ServiceEnCodeMessage(msg);

        const i = to64Int(0);
        const r = Buffer.concat([i, data]);

        console.log('写入数据到文件', this.storePath);
        fs.appendFileSync(this.storePath, r, { encoding: 'binary' });
    }

    private messageEncoder(data: any[]) {
        data.forEach(msg => {
            // 文件开头，包含了时间
            if ('batch_metadata'.includes(msg.tp)) {
                this.encode({ tp: 'timestamp', timestamp: msg.timestamp });
                return;
            }

            // 不需要
            if (this.ignoreMessage.includes(msg.tp)) {
                // 更新到数据库
                // if(resource_timing) {}

                return;
            }

            this.encode(msg);
        });
    }

    insert(buf: Buffer) {
        const messageDistributor = new MessageDistributor();
        let msg = messageDistributor.readAndDistributeMessages(buf);

        this.messageEncoder(msg);
    }

    start(projectId, sessionId) {
        this.projectId = projectId;
        this.sessionId = sessionId;
        this.storePath = `${this.config.storePath}/${projectId}/sessions/${sessionId}/dom.mobs.json`;
        const dir = `${this.config.storePath}/${projectId}/sessions/${sessionId}`;

        if (fs.existsSync(this.storePath)) {
            // 是否要删除之前的数据文件
            console.log('删除之前的数据文件', this.storePath);
            fs.rmSync(this.storePath);
        }

        console.log('创建数据存储目录', dir);
        fs.mkdirSync(dir, { recursive: true });
    }
}
