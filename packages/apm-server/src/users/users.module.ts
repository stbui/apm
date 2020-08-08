import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { UsersProviders } from './users.providers';
import { IsUserAlreadyExist } from './users.validator';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UsersProviders, UsersService, IsUserAlreadyExist],
    exports: [UsersService],
})
export class UsersModule {}
