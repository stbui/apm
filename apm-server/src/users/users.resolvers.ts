import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service'


@Resolver('User')
export class UsersResolvers {
  constructor(private usersService: UsersService) { }

  @Query()
  async getUsers() {
    return await this.usersService.getUsers()
  }

  @Query('user')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ) {
    return await this.usersService.findOneById(id)
  }
}
