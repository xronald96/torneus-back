import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateMatchDto,
  FilterMatchDto,
  UpdateMatchDto,
} from '../../dto/match.dto';
import { MatchService } from '../../services/match.service';
import { MatchType } from '../../types/match.type';

@Resolver((of) => MatchType)
export class MatchResolver {
  constructor(private matchService: MatchService) {}

  @Query((returns) => [MatchType])
  getMatchs(
    @Args('filterMatchDto')
    filtermatchDto?: FilterMatchDto,
  ) {
    return this.matchService.getMatch(filtermatchDto);
  }

  @Mutation((returns) => MatchType)
  createMatch(@Args('createMatchtDto') createMatchtDto: CreateMatchDto) {
    return this.matchService.create(createMatchtDto);
  }

  @Mutation((returns) => MatchType)
  updateMatch(@Args('updateMatchDto') updateMatchDto: UpdateMatchDto) {
    return this.matchService.updtae(updateMatchDto);
  }
}
