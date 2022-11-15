import fs from 'fs';
import Service from './service';

import MessageReader from './MessageReader';
import { Pipeline } from './pipeline';

// // 将客户端发送过来的数据重新打包;
// const reader = fs.readFileSync('./5.txt');
// const pipeline = new Pipeline(reader, './test5.json');
// const msgs: any = [];
// pipeline.unpack(msg => msgs.push(msg));

// //读取存档数据包
// const reader1 = fs.readFileSync(process.cwd() + '/test');
// const messageReader = new MessageReader(reader1, 0);
// const msgs1: Array<any> = [];

// while (messageReader.hasNext()) {
//     const next: any = messageReader.next();
//     if (next != null) {
//         msgs1.push(next[0]);
//     }
// }
console.log();
/////////////////////

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
            // 将客户端发送过来的数据重新打包;
            // const pipeline = new Pipeline(chunk, './20221115.json');
            // const msgs: any = [];
            // pipeline.unpack(msg => msgs.push(msg));
            // console.log(msgs);
            fs.writeFileSync('20221115.json', chunk);
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
