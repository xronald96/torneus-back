import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../graphql/schemas/user.schema';

@InputType()
export class AuthCredentialsDto {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  password: string;
}

export class JwtPayload {
  token: string;
  user: User;
}
