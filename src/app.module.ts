import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth.module';
import { GroupModule } from './modules/group.module';
import { MatchModule } from './modules/match.module';
import { TournamentModule } from './modules/tournament.module';
import { UserModule } from './modules/user.module';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://DevRonald:Ro_nald123456@enjoymadrid.rlmhn.mongodb.net/Torneus?retryWrites=true&w=majority',
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      cache: 'bounded',
      autoSchemaFile: true,
    }),
    UserModule,
    AuthModule,
    TournamentModule,
    MatchModule,
    GroupModule,
  ],
})
export class AppModule {}
