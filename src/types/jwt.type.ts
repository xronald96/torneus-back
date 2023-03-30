import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/graphql/schemas/user.schema';
import { UserType } from './user.type';

@ObjectType('Jwt')
export class JwtType {
  @Field(() => UserType)
  user: User;
  @Field()
  token: string;
}
