import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * @class OriginMiddleware
 * @classdesc 用于验证是否为非法来源请求
 */
@Injectable()
export class OriginMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log(`OriginMiddleware`);

        next();
    }
}
