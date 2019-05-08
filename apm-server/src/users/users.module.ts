import { Module } from '@nestjs/common';
import { UsersResolvers } from './users.resolvers';
import { UserController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  controllers: [UserController],
  providers: [UsersResolvers, UsersService],
})
export class UsersModule { }
