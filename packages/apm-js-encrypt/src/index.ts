import fs from 'fs';
import Service from './service';

import { BatchWriter, MessageEncoder, PrimitiveEncoder } from './client';
import { MStreamReader, RawMessageReader, MessageDistributor, PrimitiveReader } from './server';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';
import { Pipeline, to64Int } from './pipeline';

function encode(msg) {
    const data = ServiceEnCodeMessage(msg);

    const i = to64Int(0);
    const r = Buffer.concat([i, data]);
    fs.appendFileSync('./src/api/20221122.json', r, { encoding: 'binary' });
}

function messageEncoder(data) {
    data.forEach(msg => {
        if ('batch_metadata'.includes(msg.tp)) {
            encode({ tp: 'timestamp', timestamp: msg.timestamp });
            return;
        }

        // 不需要
        if (['batch_metadata', 'user_id', 'resource_timing', 'page_load_timing'].includes(msg.tp)) {
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

const buf = fs.readFileSync('./20221122.json');
receive(buf);

Service.use(ctx => {
    // ctx.body = content;

    if (ctx.url === '/6452555841131295') {
        // ctx.setHeader(200);
    }

    if (ctx.url === '/start') {
        const a = {
            userUUID: 'e23a1491-21ab-438f-b5c2-838ddf1797d8',
            projectKey: 'FC8cwpO5yLvmHKidhn6X',
            revID: '',
            trackerVersion: '4.1.7',
            isSnippet: true,
            timestamp: 1669108307622,
            userID: '',
            deviceMemory: 8192,
            jsHeapSizeLimit: 4294705152,
        };
    }

    if (ctx.url === '/v1/web/i') {
        ctx.req.on('data', chunk => {
            console.log(`可用的数据块: ${chunk.length}`);

            // receive(chunk);
        });

        ctx.body = 'ok';
        return;
    }

    try {
        let apiDir = process.cwd() + '/src/api' + ctx.url + '.json';
        const content = fs.readFileSync(apiDir);
        ctx.body = content;
    } catch (e) {
        ctx.body = 'no ' + ctx.url;
    }
});

Service.listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
