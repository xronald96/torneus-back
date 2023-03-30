import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserResolver } from 'src/graphql/resolvers/user.resolver';
import { User, UserSchema } from 'src/graphql/schemas/user.schema';
import { UserService } from 'src/services/user.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
