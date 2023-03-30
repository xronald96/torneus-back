import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType('Tournament')
export class TournamentType {
  @Field((type) => ID)
  _id: string;
  @Field()
  name: string;
  @Field((type) => [String])
  teams: string[];
  @Field((type) => [String])
  teamsAvailables: string[];
  @Field()
  date: string;
  @Field()
  image?: string;
  @Field()
  userId: string;
}
