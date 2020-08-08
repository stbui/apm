import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Website {
    @ApiProperty()
    @IsString()
    readonly name: string;
}
