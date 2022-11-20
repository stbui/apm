import fs from 'fs';
import Service from './service';

import { BatchWriter, MessageEncoder } from './client';
import { MStreamReader, RawMessageReader, MessageDistributor } from './server';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';
import { Pipeline } from './pipeline';

// 解
const buf = fs.readFileSync('./20221115.json');
const messageDistributor = new MessageDistributor();
let msg = messageDistributor.readAndDistributeMessages(buf);

fs.writeFileSync('./1.json', JSON.stringify(msg, null, 2));

// 加
//
// [
//     {
//         tp: 'set_page_location',
//         url: 'https://newh5.dgzq.com.cn:8888/m/trade/views/account/index.html',
//         referrer: 'https://newh5.dgzq.com.cn:8888/hqm/hq/views/market/mainPanel.html',
//         navigationStart: 1668922882079,
//         time: 277791,
//         _index: 389,
//     },
// ].forEach(msg => {
//     const data = ServiceEnCodeMessage(msg);

//     const i = to64Int(0);
//     const r = Buffer.concat([i, data]);
//     console.log(r);
// });

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
            console.log(`1可用的数据块: `);

            fs.appendFileSync('20221117.json', chunk);
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
