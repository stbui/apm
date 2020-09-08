import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
    IsArray,
    IsEmail,
    IsString,
    MinLength,
    Validate,
    IsEmpty,
    IsNotEmpty,
} from 'class-validator';
export class CreateUserDto {
    @ApiProperty({
        description: '邮箱',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: '密码',
    })
    @IsNotEmpty({ message: '密码不能为空' })
    @MinLength(6, {
        message: '密码长度不够6位',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: '重复密码',
    })
    @IsNotEmpty({ message: '重复密码不能为空' })
    @IsString()
    repassword: string;
}

export class loginUserDto {
    @ApiProperty({
        description: '邮箱',
    })
    @IsNotEmpty({ message: '邮箱不能为空' })
    email: string;

    @ApiProperty({
        description: '密码',
    })
    @IsNotEmpty({ message: '密码不能为空' })
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
