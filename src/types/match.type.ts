import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
@ObjectType('Teams')
export class Team {
  @Field((type) => String)
  name: string;
  @Field((type) => String)
  points: string;
}

@ObjectType('Match')
export class MatchType {
  @Field((type) => ID)
  _id: string;
  @Field()
  tournamentId: string;
  @Field()
  groupId: string;
  @Field((type) => [Team])
  teams: Team[];
  @Field()
  userId: string;
  @Field()
  state: string;
}
