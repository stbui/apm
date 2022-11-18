import fs from 'fs';
import Service from './service';

import { BatchWriter } from './client';
import { MStreamReader, RawMessageReader, MessageDistributor } from './server';

const timestamp = +new Date();
const batchWriter = new BatchWriter(1, timestamp, 'url', (batch: any) => {
    console.log(batch);

    const messageDistributor = new MessageDistributor();
    let msg = messageDistributor.readAndDistributeMessages(batch);

    console.log(msg);
});

batchWriter.writeMessage([4, '2', '3', 1]);
batchWriter.finaliseBatch();

Service.use(ctx => {
    // ctx.body = content;

    if (ctx.url === '/6452555841131295') {
        // ctx.setHeader(200);
    }

    if (ctx.url === '/start') {
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
            console.log(`1可用的数据块: `, chunk);

            fs.writeFileSync('20221117.json', chunk);
            process.exit();
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
