import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type GroupDocument = HydratedDocument<Group>;

@Schema()
export class Group {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  teams: string[];

  @Prop({
    required: true,
  })
  tournamentId: string;

  @Prop({
    required: true,
  })
  userId: string;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
