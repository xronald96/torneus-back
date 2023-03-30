import { ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateGroupDto, FilterGroupDto } from '../../dto/group.dto';
import { GroupService } from '../../services/group.service';
import { GroupType, GroupTypeAllData } from '../../types/group.type';

@Resolver((of) => GroupType)
export class GroupResolver {
  constructor(private groupService: GroupService) {}

  @Mutation((returns) => GroupType)
  createGroup(@Args('createGroupDto') createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Query((returns) => [GroupTypeAllData])
  getGroups(
    @Args('filterGroupDto')
    filterGroupDto?: FilterGroupDto,
  ) {
    return this.groupService.getGroups(filterGroupDto);
  }
}
