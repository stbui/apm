import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
    @ApiProperty()
    lastName: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    organizationName: string;

    @ApiProperty({
        description: '时区',
        default: 'UTC',
    })
    timezoneName: string;

    @ApiProperty()
    email: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
