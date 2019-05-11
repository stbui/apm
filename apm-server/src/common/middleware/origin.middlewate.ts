import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`OriginMiddleware`);

    next();
  }
}
