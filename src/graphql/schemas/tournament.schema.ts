import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
export type TournamentDocument = HydratedDocument<Tournament>;

@Schema()
export class Tournament {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    required: true,
  })
  name: string;
  @Prop()
  date: string;

  @Prop()
  image?: string;

  @Prop({
    required: true,
  })
  teams: string[];

  @Prop()
  teamsAvailables: string[];

  @Prop({
    required: true,
  })
  userId: string;
}

export const TournamentSchema = SchemaFactory.createForClass(Tournament);
