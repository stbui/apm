
import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';

@Middleware()
export class CorsMiddleware implements NestMiddleware {
    resolve(name: string): ExpressMiddleware {
        return (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', '*');
            res.header("Access-Control-Allow-Headers", "*");
            res.header('Access-Control-Allow-Credentials', 'true');
            console.log(`[${name}] Cors...`);
            next();
        };
    }
}