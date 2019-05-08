import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UserController {

    @Get()
    indexAction() {
        console.log('UserController')
        return { message: 'UserController' }
    }

    @Post()
    postAction(@Body() body) {
        console.log('UserController')
        return { message: body }
    }
}
