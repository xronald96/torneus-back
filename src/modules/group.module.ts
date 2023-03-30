import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupResolver } from '../graphql/resolvers/group.resolver';
import { Group, GroupSchema } from '../graphql/schemas/group.schema';
import { Match, MatchSchema } from '../graphql/schemas/match.schema';
import {
  Tournament,
  TournamentSchema,
} from '../graphql/schemas/tournament.schema';
import { GroupService } from '../services/group.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupSchema,
      },
      {
        name: Tournament.name,
        schema: TournamentSchema,
      },
      {
        name: Match.name,
        schema: MatchSchema,
      },
    ]),
  ],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}
