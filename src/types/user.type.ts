import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType('User')
export class UserType {
  @Field((type) => ID)
  _id: string;
  @Field()
  name: string;
  @Field()
  surname: string;
  @Field()
  email: string;
  @Field()
  phone: string;
  @Field()
  sex: Sex;
  @Field()
  password: string;
  @Field()
  city: string;
  @Field()
  country: string;
  @Field()
  birthday: string;
  @Field()
  creationDate: string;
}

export enum Sex {
  male = 'Male',
  female = 'Female',
  others = 'Others',
}
