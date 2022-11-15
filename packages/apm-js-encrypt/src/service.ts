import http from 'http';
import { URL } from 'url';

function compose(middlewares) {
    return ctx => {
        const dispatch = i => {
            const middleware = middlewares[i];
            if (i === middlewares.length) {
                return;
            }
            return middleware(ctx, () => dispatch(i + 1));
        };
        return dispatch(0);
    };
}

class Context {
    public body = null;

    constructor(public req, public res) {}

    get url() {
        const { pathname } = new URL(this.req.url, `http://${this.req.headers.host}`);

        return pathname;
    }

    setHeader(status: number, header = {}) {
        this.res.writeHead(status, {
            // 'Content-Type': 'application/octet-stream',
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            ...header,
        });
    }
}

export class Appliacation {
    private middlewares: any = [];

    constructor() {}

    listen(...args) {
        const server = http.createServer(async (req, res) => {
            const ctx = new Context(req, res);

            try {
                const fn = compose(this.middlewares);
                ctx.setHeader(200);
                await fn(ctx);
            } catch (e) {
                console.error(e);
                ctx.res.statusCode = 500;
                ctx.res.write('Internel Server Error');
            }

            ctx.res.end(ctx.body);
        });

        return server.listen(...args);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    get(path: string, fn) {
        this.use(ctx => {
            if (ctx.url === path) {
                fn(ctx);
            }
        });
    }

    post(path: string, fn: Function) {
        this.use(ctx => {
            if (ctx.url === path) {
                fn(ctx);
            }
        });
    }
}

export default new Appliacation();

// app.use(ctx => {
//     if (ctx.url === '/test') {
//         ctx.body = 'test';
//     } else {
//         ctx.body = 'hello, world';
//     }
// });

// app.listen(3000);
