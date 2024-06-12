import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Organizer } from './organizer.entity';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { OrganizerService } from './organizer.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import { Event } from '../event/entities/event.entity';
import { EventService } from '../event/event.service';

@Resolver('Organizer')
export class OrganizerResolver {
  constructor(
    private readonly organizerService: OrganizerService,
    private readonly eventService: EventService,
  ) {}

  @Roles('DIRECTOR')
  @Mutation(() => Organizer)
  async createOrganizer(@Args('input') input: CreateOrganizerInput) {
    try {
      return await this.organizerService.createOrganizer(input);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('DIRECTOR', 'EDITOR', 'ADMIN')
  @Query(() => [Organizer])
  async getEventsByOrganizerId(@Args('id') id: string) {
    try {
      return await this.organizerService.getEventsByOrganizerId(id);
    } catch (error) {
      throw new NotFoundException('Organizer not found!');
    }
  }

  @Roles('DIRECTOR')
  @Query(() => [Organizer])
  async getOrganizers() {
    return await this.organizerService.getOrganizers();
  }

  // @Roles('DIRECTOR')
  @Mutation(() => Organizer)
  async updateOrganizer(@Args('input') input: UpdateOrganizerInput) {
    return await this.organizerService.updateOrganizer(input);
  }

  @Roles('DIRECTOR')
  @Mutation(() => Organizer)
  async deleteOrganizer(
    @Args('input') createOrganizerInput: CreateOrganizerInput,
  ) {
    return await this.organizerService.deleteOrganizer(createOrganizerInput);
  }

  // @ResolveField(() => Event)
  // event(@Parent() organizer: Organizer) {
  //   return this.eventService.findOne(organizer.event_id);
  // }
}
