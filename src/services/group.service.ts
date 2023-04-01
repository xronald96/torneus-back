import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroupDto, FilterGroupDto } from '../dto/group.dto';
import { Group, GroupDocument } from '../graphql/schemas/group.schema';
import { Match, MatchDocument } from '../graphql/schemas/match.schema';
import {
  Tournament,
  TournamentDocument,
} from '../graphql/schemas/tournament.schema';
import { GroupType } from '../types/group.type';
import { MatchType } from '../types/match.type';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private grouptModel: Model<GroupDocument>,
    @InjectModel(Tournament.name)
    private tournametModel: Model<TournamentDocument>,
    @InjectModel(Match.name)
    private matchModel: Model<MatchDocument>,
  ) {}

  async create(createGrouptDto: CreateGroupDto): Promise<Group> {
    const { teams, tournamentId } = createGrouptDto;
    const tournament = await this.tournametModel.findById(tournamentId).exec();
    if (!tournament) throw new NotFoundException('Tournament not found');
    if (!teams.every((team) => tournament.teamsAvailables.includes(team)))
      throw new NotFoundException('Teams are not available');

    tournament.teamsAvailables = tournament.teamsAvailables.filter(
      (team) => !teams.includes(team),
    );

    tournament.save();

    const newTournamet = new this.grouptModel({
      ...createGrouptDto,
    });

    await newTournamet.save();
    return newTournamet;
  }

  async getGroups(filterGroupDto: FilterGroupDto): Promise<any[]> {
    let groups = await this.grouptModel.find({ ...filterGroupDto }).exec();
    groups = groups.map((item) => item.toObject());
    const result = [];
    for (const group of groups) {
      let matches = await this.matchModel.find({ groupId: group._id }).exec();
      matches = matches.map((item) => item.toObject());
      result.push({
        group,
        matches,
      });
    }
    const returnResult = resutlTable(result);
    return returnResult;
  }
}

const resutlTable = (data: Array<Result>) => {
  const resultPerGroup = data.map((item: Result) => {
    const resultByTeam = item.group.teams.map((team: string) => {
      const pointsTeam = item.matches.reduce(
        (prevValue: any, nextValue: Match) => {
          const allPoints = resultMatch(nextValue, team);
          prevValue.points += allPoints.points;
          prevValue.gf += allPoints.gf;
          prevValue.ge += allPoints.ge;
          return prevValue;
        },
        { points: 0, gf: 0, ge: 0, gd: 0 },
      );
      return {
        points: Number(pointsTeam.points),
        gf: Number(pointsTeam.gf),
        ge: Number(pointsTeam.ge),
        gd: Math.abs(Number(pointsTeam.gf - pointsTeam.ge)),
        name: team,
      };
    });
    return {
      ...item,
      resultGroup: resultByTeam
        .sort((a, b) => {
          return a.points - b.points || a.gd - b.gd;
        })
        .reverse(),
    };
  });
  return resultPerGroup;
};

const resultMatch = (
  match: Match,
  team: string,
): { points: number; gf: number; ge: number } => {
  if (match.state === 'CREATED') return { points: 0, gf: 0, ge: 0 };
  if (
    match.teams[0].name === team &&
    Number(match.teams[0].points) > Number(match.teams[1].points)
  )
    return {
      points: 3,
      gf: Number(match.teams[0].points),
      ge: Number(match.teams[1].points),
    };
  else if (
    match.teams[1].name === team &&
    Number(match.teams[1].points) > Number(match.teams[0].points)
  )
    return {
      points: 3,
      gf: Number(match.teams[1].points),
      ge: Number(match.teams[0].points),
    };
  else if (
    (match.teams[1].name === team || match.teams[0].name === team) &&
    Number(match.teams[1].points) === Number(match.teams[0].points)
  )
    return {
      points: 1,
      gf: Number(match.teams[0].points),
      ge: Number(match.teams[1].points),
    };
  else if (
    match.teams[0].name === team &&
    Number(match.teams[0].points) < Number(match.teams[1].points)
  )
    return {
      points: 0,
      gf: Number(match.teams[0].points),
      ge: Number(match.teams[1].points),
    };
  else if (
    match.teams[1].name === team &&
    Number(match.teams[1].points) < Number(match.teams[0].points)
  )
    return {
      points: 0,
      gf: Number(match.teams[1].points),
      ge: Number(match.teams[0].points),
    };
  else return { points: 0, gf: 0, ge: 0 };
};

type Result = {
  group: Group;
  matches: Match[];
};
