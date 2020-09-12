import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWebsiteDto {
    @ApiProperty({
        description: '站点名称',
    })
    @IsString()
    readonly name: string;
}

export class UpdateWebsiteDto extends PartialType(CreateWebsiteDto) {
    @ApiProperty({
        description: 'origin',
    })
    readonly origin: string;
}
