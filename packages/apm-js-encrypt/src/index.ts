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

// const buf = fs.readFileSync('./20221122.json');
// receive(buf);

function bodyParse(ctx) {
    let chunks;
    ctx.req.on('data', chunk => {
        console.log(`可用的数据块: ${chunk.length}`);
        chunks = JSON.parse(chunk);
    });

    return chunks;
}

Service.use(ctx => {
    // ctx.body = content;

    if (ctx.url === '/3296/sessions/6062739610258400') {
        const a = {
            data: {
                sessionId: '6062739610258400',
                projectId: 3296,
                startTs: 1669687939843,
                duration: 309061,
                userId: '',
                userAnonymousId: null,
                userUuid: '6a564991-8a20-4c1c-955f-96aa6da4dc84',
                userAgent:
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 12_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36',
                userOs: 'Mac OS X',
                userBrowser: 'Chrome',
                userDevice: '',
                userDeviceType: 'desktop',
                userCountry: 'HK',
                pagesCount: 5,
                eventsCount: 54,
                errorsCount: 0,
                revId: null,
                userOsVersion: '12.5.1',
                userBrowserVersion: '89.0.4389',
                userDeviceHeapSize: 4294705152,
                userDeviceMemorySize: 8192,
                trackerVersion: '4.1.5',
                watchdogsScore: 0,
                platform: 'web',
                issueScore: 1668429134,
                issueTypes: '{dead_click,memory,cpu}',
                isSnippet: false,
                rehydrationId: null,
                utmSource: null,
                utmMedium: null,
                utmCampaign: null,
                referrer: null,
                baseReferrer: null,
                fileKey: null,
                projectKey: 'FC8cwpO5yLvmHKidhn6X',
                favorite: false,
                viewed: true,
                events: [],
                stackEvents: [],
                errors: [],
                userEvents: [],
                domURL: ['http://127.0.0.1:8888/3296/sessions/6062739610258400/dom.mobs'],
                mobsUrl: ['http://127.0.0.1:8888/3296/sessions/6062739610258400/20221122'],
                devtoolsURL: ['http://127.0.0.1:8888/3296/sessions/6062739610258400/devtools.mob'],
                resources: [],
                notes: [],
                metadata: {},
                issues: [],
                live: false,
                inDB: true,
            },
        };
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

            console.log(sessionStart);
        });

        fs.rmSync('./src/api/3296/sessions/6062739610258400/dom.mobs.json');
    }

    if (ctx.url === '/v1/web/i') {
        ctx.req.on('data', chunk => {
            console.log(`可用的数据块: ${chunk.length}`);

            receive(chunk);
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
