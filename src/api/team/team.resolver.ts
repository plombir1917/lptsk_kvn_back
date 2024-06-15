import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TeamService } from './team.service';
import { Team } from './entities/team.entity';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { EventService } from '../event/event.service';
import { Activity } from '../event/entities/activity.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver(() => Team)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly eventService: EventService,
  ) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Team)
  async createTeam(@Args('input') createTeamInput: CreateTeamInput) {
    try {
      return await this.teamService.create(createTeamInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [Team])
  async getTeams() {
    try {
      return await this.teamService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Team)
  async updateTeam(
    @Args('id') id: string,
    @Args('input') updateTeamInput: UpdateTeamInput,
  ) {
    try {
      return await this.teamService.update(+id, updateTeamInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Team)
  async deleteTeam(@Args('id') id: string) {
    try {
      return await this.teamService.remove(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ResolveField(() => [Activity], { nullable: true })
  async event(@Parent() team: Team) {
    return await this.eventService.findManyByTeamId(team.id);
  }
}
