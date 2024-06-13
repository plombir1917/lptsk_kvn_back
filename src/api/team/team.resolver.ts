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
import { Event } from '../event/entities/event.entity';
import { Activity } from '../event/entities/activity.entity';

@Resolver(() => Team)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly eventService: EventService,
  ) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Team)
  createTeam(@Args('input') createTeamInput: CreateTeamInput) {
    return this.teamService.create(createTeamInput);
  }

  @Query(() => [Team])
  getTeams() {
    return this.teamService.findAll();
  }

  @Query(() => Team)
  findOne(@Args('id') id: number) {
    return this.teamService.findOne(id);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Team)
  updateTeam(
    @Args('id') id: string,
    @Args('input') updateTeamInput: UpdateTeamInput,
  ) {
    return this.teamService.update(+id, updateTeamInput);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Team)
  deleteTeam(@Args('id') id: string) {
    return this.teamService.remove(+id);
  }

  @ResolveField(() => [Activity], { nullable: true })
  async event(@Parent() team: Team) {
    const events = await this.eventService.findManyByTeamId(team.id);
    console.log(events);
    return events;
  }
}
