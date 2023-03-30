import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateTournamentDto } from '../../dto/tournament.dto';
import { TournamentService } from '../../services/tournament.service';
import { TournamentType } from '../../types/tournament.type';

@Resolver((of) => TournamentType)
export class TournamentResolver {
  constructor(private tournamentService: TournamentService) {}

  @Mutation((returns) => TournamentType)
  createTournament(
    @Args('createTournamentDto') createTournamentDto: CreateTournamentDto,
  ) {
    return this.tournamentService.create(createTournamentDto);
  }

  @Query((returns) => [TournamentType])
  getTournaments() {
    return this.tournamentService.getTournaments();
  }
}
