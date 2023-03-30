import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTournamentDto {
  @Field()
  @IsNotEmpty()
  name: string;
  @Field((type) => [String])
  @IsNotEmpty()
  teams: string[];
  @Field()
  @IsNotEmpty()
  date: string;
  @Field()
  @IsOptional()
  image?: string;
  @Field()
  @IsNotEmpty()
  userId: string;
}
