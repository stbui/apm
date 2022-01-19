import http from 'http';
import fs from 'fs';
import { OpenReplayEncoder } from './encoder';
import { OpenReplayDecoder } from './decoder';
import MessageReader from './MessageReader';
import ServiceReadMessage from './ServiceReadMessage';
import PrimitiveReader from './PrimitiveReader';
import { Pipeline } from './pipeline';
import ServiceEnCodeMessage from './ServiceEnCodeMessage';

const reader = fs.readFileSync('./5.txt');
const msgs: Array<any> = [];

// const r = new MessageReader(reader, 0);
// while (r.hasNext()) {
//     const msg = ServiceReadMessage(r);
//     msgs.push(msg);
// }

const b = Buffer.from([80, 8, 0, 224, 183, 141, 179, 204, 95]);
const pipeline = new Pipeline(b, './test');
pipeline.unpack(msg => {
    msgs.push(msg);
});

const test = fs.readFileSync('./test');
console.log(test);

// const b = ServiceEnCodeMessage({ tp: 80, pageNo: 8, firstIndex: 0, timestamp: 1642341707248 });
// console.log(Buffer.from(b));

function to64Int(value) {
    const buffer = Buffer.alloc(8);
    let offset = 0;

    while (value >= 0x80) {
        buffer[offset++] = value % 0x100 | 0x80;
        value = Math.floor(value / 128);
    }
    buffer[offset++] = value;

    return buffer;
}

console.log(to64Int(1642341707248));

// // console.log(new d2(c).decode());
///////////////////////
// const reader = fs.readFileSync('./6006400213795107');
// const r = new MessageReader(reader, 0);
// const msgs: Array<any> = [];

// while (r.hasNext()) {
//     const next: any = r.next();
//     if (next != null) {
//         // console.log(next[0].time);
//         // this.distributeMessage(next[0], next[1]);
//         msgs.push(next[0]);
//     }
// }
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

    response.end(JSON.stringify(msgs));
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
