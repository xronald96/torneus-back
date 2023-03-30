import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TournamentResolver } from '../graphql/resolvers/tournament.resolver';
import {
  Tournament,
  TournamentSchema,
} from '../graphql/schemas/tournament.schema';
import { TournamentService } from '../services/tournament.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tournament.name,
        schema: TournamentSchema,
      },
    ]),
  ],
  providers: [TournamentService, TournamentResolver],
})
export class TournamentModule {}
