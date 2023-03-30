import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Team } from '../types/match.type';

@InputType()
export class CreateMatchDto {
  @Field()
  @IsNotEmpty()
  tournamentId: string;

  @Field()
  @IsNotEmpty()
  groupId: string;

  @Field((type) => [Team])
  @IsNotEmpty()
  teams: Team[];

  @Field()
  @IsNotEmpty()
  userId: string;
}

@InputType()
export class FilterMatchDto {
  @Field({ nullable: true })
  @IsOptional()
  groupId: string;
}

@InputType()
export class UpdateMatchDto {
  @Field()
  @IsNotEmpty()
  _id: string;
  @Field((type) => [Team])
  @IsNotEmpty()
  teams: Team[];
}
