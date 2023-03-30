import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Team } from '../../types/match.type';
export type MatchDocument = HydratedDocument<Match>;

@Schema()
export class Match {
  _id: MongooseSchema.Types.ObjectId;
  @Prop({
    required: true,
  })
  tournamentId: string;

  @Prop({
    required: true,
  })
  groupId: string;

  @Prop({
    required: true,
  })
  teams: Team[];

  @Prop({
    required: true,
  })
  userId: string;

  @Prop()
  state: string;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
