import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class Users {
    @ApiModelProperty()
    @IsNotEmpty()
    username: string;

    @ApiModelProperty()
    @IsNotEmpty()
    password: string;

    @ApiModelProperty()
    @IsNotEmpty()
    email: string;
}
