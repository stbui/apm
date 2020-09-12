import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { httpResponse } from './http-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        httpResponse(exception, host);
    }
}
