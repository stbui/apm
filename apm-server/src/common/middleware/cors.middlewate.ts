import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from '../../config/config';

/**
 * @class CorsMiddleware
 * @classdesc 用于处理 CORS 跨域
 */
@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('X-Powered-By', `Apm ${Config.version}`);

    console.log(`CorsMiddleware...`);

    next();
  }
}
