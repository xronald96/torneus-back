import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchResolver } from '../graphql/resolvers/match.resolver';
import { MatchSchema, Match } from '../graphql/schemas/match.schema';
import { MatchService } from '../services/match.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Match.name,
        schema: MatchSchema,
      },
    ]),
  ],
  providers: [MatchService, MatchResolver],
})
export class MatchModule {}
