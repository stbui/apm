import http from 'http';
import fs from 'fs';
import { OpenReplayEncoder } from './encoder';
import { OpenReplayDecoder } from './decoder';
import MessageReader from './MessageReader';
import ServiceReadMessage from './ServiceReadMessage';
import PrimitiveReader from './PrimitiveReader';

// const openReplayEncoder = new OpenReplayEncoder(200000);
// timestamp
// openReplayEncoder.uint(0);
// openReplayEncoder.uint(1641375555383);

// openReplayEncoder.uint(49);
// openReplayEncoder.int(74);
// openReplayEncoder.int(41);
// openReplayEncoder.uint(15002696);
// openReplayEncoder.uint(12712748);

// const encode = openReplayEncoder.flush();
// console.log(encode);

const reader = fs.readFileSync('./5.txt');

const r = new MessageReader(reader, 0);
const msgs: Array<any> = [];

while (r.hasNext()) {
    const msg = ServiceReadMessage(r);
    msgs.push(msg);
}

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
