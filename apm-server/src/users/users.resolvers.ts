import { ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';


@Resolver('User')
export class UsersResolvers {
  constructor(private usersService: UsersService) { }

  @Query()
  async users(@Args('page') page: number) {
    return await this.usersService.findAll();
  }

  @Query()
  async user(@Args('username') username: string) {
    return await this.usersService.findOne({ username });
  }

  @Mutation()
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = { username, password };
    return await this.usersService.login(user);
  }

  @Mutation()
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = { username, password };
    return await this.usersService.register(user);
  }
}
