import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateMatchDto,
  FilterMatchDto,
  UpdateMatchDto,
} from '../dto/match.dto';
import { Match, MatchDocument } from '../graphql/schemas/match.schema';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel(Match.name)
    private matchModel: Model<MatchDocument>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const newMatch = new this.matchModel({
      ...createMatchDto,
      state: 'CREATED',
    });
    await newMatch.save();
    return newMatch;
  }

  async updtae(updateMatchDto: UpdateMatchDto): Promise<Match> {
    const result = await this.matchModel.findById(updateMatchDto._id).exec();
    result.teams = updateMatchDto.teams;
    result.state = 'INPROGRESS';
    await result.save();
    return result;
  }

  async getMatch(filterMatchDto?: FilterMatchDto): Promise<Match[]> {
    return await this.matchModel.find({ ...filterMatchDto }).exec();
  }
}
