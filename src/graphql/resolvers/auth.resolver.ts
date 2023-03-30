import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthCredentialsDto, JwtPayload } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';
import { JwtType } from 'src/types/jwt.type';

@Resolver((of) => JwtType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => JwtType)
  singIn(
    @Args('authCredentialsDto') authCredentialsDto: AuthCredentialsDto,
  ): Promise<JwtPayload> {
    return this.authService.login(authCredentialsDto);
  }
}
