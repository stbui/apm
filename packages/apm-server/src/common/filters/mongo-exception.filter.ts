import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter
} from '@nestjs/common';
import { MongoError } from 'mongodb';
import { httpResponse } from './http-response';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        httpResponse(new ConflictException(), host);
    }
  }
}
