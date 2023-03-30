import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTournamentDto } from '../dto/tournament.dto';
import {
  Tournament,
  TournamentDocument,
} from '../graphql/schemas/tournament.schema';

@Injectable()
export class TournamentService {
  constructor(
    @InjectModel(Tournament.name)
    private tournamentModel: Model<TournamentDocument>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const newTournamet = new this.tournamentModel({
      ...createTournamentDto,
      teamsAvailables: createTournamentDto.teams,
    });
    await newTournamet.save();
    return newTournamet;
  }

  async getTournaments(): Promise<Tournament[]> {
    return await this.tournamentModel.find({}).exec();
  }
}
