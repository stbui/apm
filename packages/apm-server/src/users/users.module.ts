import { Module } from '@nestjs/common';
import { DatabaseModule } from '../common/database/database.module';
import { UsersResolvers } from './users.resolvers';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { IsUserAlreadyExist } from './users.validator';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UsersResolvers, ...usersProviders, UsersService, IsUserAlreadyExist],
    exports: [UsersService],
})
export class UsersModule {}
