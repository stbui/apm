import http from 'http';
import fs from 'fs';
import MessageReader from './MessageReader';
import { Pipeline } from './pipeline';

const reader = fs.readFileSync('./5.txt');
const pipeline = new Pipeline(reader, './test1');
const msgs = [];
pipeline.unpack(msg => msgs.push(msg));

const reader1 = fs.readFileSync('./test');
// const reader1 = fs.readFileSync('./6062791290173460');
const r = new MessageReader(reader1, 0);
const msgs1: Array<any> = [];

while (r.hasNext()) {
    const next: any = r.next();
    if (next != null) {
        msgs1.push(next[0]);
    }
}
console.log();
/////////////////////

http.createServer(function (req, response) {
    response.writeHead(200, {
        // 'Content-Type': 'text/plain',
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    });

    req.on('data', chunk => {
        console.log(`可用的数据块: `);

        fs.writeFileSync('./1', chunk);
    });
    req.on('end', () => {
        //数据结束
        console.log('end');
    });

    response.end(JSON.stringify(msgs1, null,2 ));
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
