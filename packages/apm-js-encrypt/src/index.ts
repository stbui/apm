import fs from 'fs';
import Service from './service';

import MessageReader from './MessageReader';
import { Pipeline } from './pipeline';

// 将客户端发送过来的数据重新打包;
const reader = fs.readFileSync('./5.txt');
const pipeline = new Pipeline(reader, './test5.json');
const msgs = [];
pipeline.unpack(msg => msgs.push(msg));

//读取存档数据包
const reader1 = fs.readFileSync(process.cwd() + '/test');
const messageReader = new MessageReader(reader1, 0);
const msgs1: Array<any> = [];

while (messageReader.hasNext()) {
    const next: any = messageReader.next();
    if (next != null) {
        msgs1.push(next[0]);
    }
}
console.log();
/////////////////////

Service.use(ctx => {
    if (ctx.url === '/6452555841131295') {
        // ctx.setHeader(200);
    }

    // let apiDir = process.cwd() + '/src/api' + ctx.url + '.json';
    // const content = fs.readFileSync(apiDir);
    // ctx.body = content;

    ctx.body = 'test';
});

Service.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
