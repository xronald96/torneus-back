import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Sex } from '../types/user.type';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
  @Field()
  @IsNotEmpty()
  surname: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @MinLength(6)
  phone: string;
  @Field()
  @IsNotEmpty()
  sex: Sex;
  @Field()
  @IsNotEmpty()
  password: string;
  @Field()
  @IsNotEmpty()
  city: string;
  @Field()
  @IsNotEmpty()
  country: string;
  @Field()
  @IsNotEmpty()
  birthday: string;
}
