import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const content = request.method + ' -> ' + request.url;
        console.log('+ 收到请求：', content);
        const now = Date.now();

        return next.handle().pipe(tap(() => console.log('- 响应请求：', content, `${Date.now() - now}ms`)));
    }
}
