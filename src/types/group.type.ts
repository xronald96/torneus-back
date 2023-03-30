import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MatchType } from './match.type';

@ObjectType('Group')
export class GroupType {
  @Field((type) => ID)
  _id: string;
  @Field()
  name: string;
  @Field((type) => [String])
  teams: string[];
  @Field()
  tournamentId: string;
  @Field()
  userId: string;
}

@ObjectType('GroupWithAllData')
export class GroupTypeAllData {
  @Field()
  group: GroupType;
  @Field((field) => [MatchType])
  matches: MatchType[];
  @Field((field) => [Result])
  resultGroup: Result[];
}

@ObjectType('Result')
class Result {
  @Field()
  name: string;
  @Field()
  points: number;
  @Field()
  gf: number;
  @Field()
  ge: number;
  @Field()
  gd: number;
}
