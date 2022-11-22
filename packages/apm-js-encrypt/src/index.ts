import fs from 'fs';
import Service from './service';

import { BatchWriter, MessageEncoder } from './client';
import { MStreamReader, RawMessageReader, MessageDistributor } from './server';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';
import { Pipeline, to64Int } from './pipeline';

// 解
const buf = fs.readFileSync('./20221122.json');
const messageDistributor = new MessageDistributor();
let msg = messageDistributor.readAndDistributeMessages(buf);

// fs.writeFileSync('./1.json', JSON.stringify(msg, null, 2));

// 加

function encode(msg) {
    const data = ServiceEnCodeMessage(msg);

    const i = to64Int(0);
    const r = Buffer.concat([i, data]);
    fs.appendFileSync('./src/api/20221122.json', r, { encoding: 'binary' });
}

encode({ tp: 'timestamp', timestamp: 0 });
msg.forEach(msg => {
    // 不需要
    if (['batch_metadata', 'user_id', 'resource_timing', 'page_load_timing'].includes(msg.tp)) {
        return;
    }
    encode(msg);
});

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

        // Timestamp:      req.Timestamp,
        // 	ProjectID:      uint64(p.ProjectID),
        // 	TrackerVersion: req.TrackerVersion,
        // 	RevID:          req.RevID,
        // 	UserUUID:       userUUID,
        // 	UserOS:         "IOS",
        // 	UserOSVersion:  req.UserOSVersion,
        // 	UserDevice:     ios.MapIOSDevice(req.UserDevice),
        // 	UserDeviceType: ios.GetIOSDeviceType(req.UserDevice),
        // 	UserCountry:    country,
        // 将项目信息写入数据包中
    }

    if (ctx.url === '/v1/web/i') {
        ctx.req.on('data', chunk => {
            console.log(`1可用的数据块: `);

            // fs.appendFileSync('20221122.json', chunk);
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
