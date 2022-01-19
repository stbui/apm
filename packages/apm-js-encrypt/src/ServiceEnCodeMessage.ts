import writer from './writer';

function BatchMeta() {
    const w = new writer(31);
    w.uint(80);
    w.uint(8);
    w.uint(0);
    w.int(1642341707248);
    w.checkpoint();
    return w.flush();
}

export default function ServiceEnCodeMessage(msg) {
    const tp = msg.tp;

    if (tp === 80) {
        return BatchMeta();
    }

    // const w = new writer(31);
    // w.uint(8);
    // w.uint(0);
    // w.int(1642341707248);
    // w.checkpoint();
    // return w.flush();
}
