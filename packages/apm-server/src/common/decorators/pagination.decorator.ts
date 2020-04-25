import { createParamDecorator } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export const Pagination = createParamDecorator((data: any, req) => {
    return req.query;
});
