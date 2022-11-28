import BatchWriter from './BatchWriter';
import MessageEncoder from './MessageEncoder.gen.js';
import PrimitiveEncoder from './PrimitiveEncoder';

// const timestamp = +new Date();

// const batchWriter = new BatchWriter(1, timestamp, 'a', batch => {
//     console.log(batch);
// });

// batchWriter.writeMessage([81, 2, 3, 4, 5, 'a']);
// batchWriter.writeMessage([5, 9, 9]);
// batchWriter.writeMessage([22, '9', '9']);
// batchWriter.finaliseBatch();

// const timestamp = +new Date();
// const batchWriter = new BatchWriter(1, timestamp, 'b', (batch: any) => {
//     console.log(batch);

//     const messageDistributor = new MessageDistributor();
//     let msg = messageDistributor.readAndDistributeMessages(batch);

//     console.log(msg);
// });

// batchWriter.writeMessage([4, 'a', 'a', 1]);
// batchWriter.writeMessage([5, 9, 9]);
// batchWriter.writeMessage([22, '9', '9']);
// batchWriter.finaliseBatch();

export { BatchWriter, MessageEncoder, PrimitiveEncoder };
