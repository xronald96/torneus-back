import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Sex } from '../../types/user.type';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    required: true,
  })
  name: string;
  @Prop({
    required: true,
  })
  surname: string;
  @Prop({
    unique: true,
  })
  email: string;
  @Prop({
    required: true,
    unique: true,
  })
  phone: string;
  @Prop()
  sex: Sex;
  @Prop({
    required: true,
  })
  password: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
  @Prop({
    required: true,
  })
  birthday: string;
  @Prop()
  creationDate: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
