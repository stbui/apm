import { BadRequestException } from '@nestjs/common';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metatype || !this.toValidate(metatype)) {
            // 如果没有传入验证规则，则不验证，直接返回数据
            return value;
        }
        // 将对象转换为 Class 来验证
        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            // 只需要取第一个错误信息并返回即可
            const msg = Object.values(errors[0].constraints)[0];
            throw new BadRequestException(`入参错误: ${msg}`);
        }
        return value;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
}
