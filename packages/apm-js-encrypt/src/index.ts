import fs from 'fs';
import Service from './service';

import { BatchWriter, MessageEncoder, PrimitiveEncoder } from './client';
import { MStreamReader, RawMessageReader, MessageDistributor, PrimitiveReader } from './server';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';
import { Pipeline, to64Int } from './pipeline';
import { SessionControl } from './database';

function encode(msg) {
    const data = ServiceEnCodeMessage(msg);

    const i = to64Int(0);
    const r = Buffer.concat([i, data]);
    fs.appendFileSync('./src/api/3296/sessions/6062739610258400/dom.mobs.json', r, { encoding: 'binary' });
}

const ignoreMessage = ['batch_metadata', 'user_id', 'resource_timing', 'page_load_timing', 'page_render_timing'];
function messageEncoder(data) {
    data.forEach(msg => {
        if ('batch_metadata'.includes(msg.tp)) {
            encode({ tp: 'timestamp', timestamp: msg.timestamp });
            return;
        }

        // 不需要
        if (ignoreMessage.includes(msg.tp)) {
            return;
        }
        encode(msg);
    });
}

function receive(buf: Buffer) {
    // fs.writeFileSync('20221122.json', buf);

    const messageDistributor = new MessageDistributor();
    let msg = messageDistributor.readAndDistributeMessages(buf);

    fs.writeFileSync('./1.json', JSON.stringify(msg, null, 2));

    messageEncoder(msg);
}

class ReceiveBuffer {
    ignoreMessage = ['batch_metadata', 'user_id', 'resource_timing', 'page_load_timing', 'page_render_timing'];

    projectId: string;
    sessionId: number;

    private _storePath: string;
    private storePath: string;

    constructor() {}

    // set storePath({ projectId, sessionId }: any) {
    //     this._storePath = `./src/api/${projectId}/sessions/${sessionId}/dom.mobs.json`;
    // }

    // get storePath() {
    //     return this._storePath;
    // }

    insert(buf: Buffer) {
        const messageDistributor = new MessageDistributor();
        let msg = messageDistributor.readAndDistributeMessages(buf);

        this.messageEncoder(msg);
    }

    messageEncoder(data: any[]) {
        data.forEach(msg => {
            if ('batch_metadata'.includes(msg.tp)) {
                encode({ tp: 'timestamp', timestamp: msg.timestamp });
                return;
            }

            // 不需要
            if (this.ignoreMessage.includes(msg.tp)) {
                return;
            }

            const data = ServiceEnCodeMessage(msg);

            const i = to64Int(0);
            const r = Buffer.concat([i, data]);

            fs.appendFileSync(this.storePath, r, {
                encoding: 'binary',
            });
        });
    }

    start(projectId, sessionId) {
        this.projectId = projectId;
        this.sessionId = sessionId;
        this.storePath = `./src/api/${projectId}/sessions/${sessionId}/dom.mobs.json`;
        const dir = `./src/api/${projectId}/sessions/${sessionId}`;

        if (fs.existsSync(dir)) {
            // 是否要删除之前的数据文件
            fs.rmSync(this.storePath);
        }

        fs.mkdirSync(dir, { recursive: true });
    }
}

function bodyParse(ctx) {
    let chunks;
    ctx.req.on('data', chunk => {
        console.log(`可用的数据块: ${chunk.length}`);
        chunks = JSON.parse(chunk);
    });

    return chunks;
}

const sessionControl = new SessionControl();
const receiveBuffer = new ReceiveBuffer();

Service.use(ctx => {
    // ctx.body = content;

    if (ctx.url === '/3296/sessions/6062739610258400') {
        sessionControl.getSessionById('6062739610258400').then(res => {
            console.log(res);
        });
    }

    if (ctx.url === '/v1/web/start') {
        ctx.req.on('data', chunk => {
            console.log(`start: ${chunk.length}`);
            const body = JSON.parse(chunk);

            const sessionStart = {
                timestamp: body.timestamp,
                userUUID: body.userUUID,
                projectKey: body.projectKey,
                revID: body.revID,
                trackerVersion: body.trackerVersion,
                isSnippet: body.isSnippet,
                userID: body.userID,
                deviceMemory: body.deviceMemory,
                jsHeapSizeLimit: body.jsHeapSizeLimit,
                userAgent: ctx.req.headers['user-agent'],
            };

            const startTimestamp = 1669628375223;
            sessionControl
                .start({
                    timestamp: startTimestamp,
                    userUUID: body.userUUID,
                    userID: body.userID,
                })
                .then(session => {
                    // receiveBuffer.start(session.projectID, session.sessionID);
                });
        });
    }

    if (ctx.url === '/v1/web/i') {
        ctx.req.on('data', chunk => {
            console.log(`可用的数据块: ${chunk.length}`);

            receiveBuffer.insert(chunk);
        });

        ctx.body = 'ok';
        return;
    }

    try {
        let apiDir = process.cwd() + '/src/api' + ctx.url + '.json';
        const content = fs.readFileSync(apiDir);
        ctx.body = content;
        console.log('[]', apiDir);
    } catch (e) {
        ctx.body = 'no ' + ctx.url;
    }
});

Service.listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
