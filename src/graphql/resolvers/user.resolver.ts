import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../../dto/user.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserService } from '../../services/user.service';
import { UserType } from '../../types/user.type';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => [UserType])
  @UseGuards(JwtAuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Query((returns) => UserType)
  @UseGuards(JwtAuthGuard)
  getUserById(@Args('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Mutation((returns) => UserType)
  createUser(@Args('createUserDto') createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
