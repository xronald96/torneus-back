import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateGroupDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  tournamentId: string;

  @Field()
  @IsNotEmpty()
  userId: string;

  @Field((type) => [String])
  @IsNotEmpty()
  teams: string[];
}

@InputType()
export class FilterGroupDto {
  @IsOptional()
  @Field({ nullable: true })
  tournamentId: string;
}
