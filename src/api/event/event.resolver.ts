import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { CreateAccountEventInput } from './dto/create-account-event.input';
import { Ticket } from '../ticket/entities/ticket.entity';
import { TicketService } from '../ticket/ticket.service';
import { CreateActivityInput } from './dto/create-activity.input';
import { Activity } from './entities/activity.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Event)
  async createEvent(@Args('input') createEventInput: CreateEventInput) {
    try {
      return await this.eventService.create(createEventInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Activity)
  async addActivity(@Args('input') createActivityInput: CreateActivityInput) {
    try {
      return await this.eventService.createActivity(createActivityInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [Event])
  async getEvents() {
    try {
      return await this.eventService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Query(() => Event)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.eventService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Event)
  async updateEvent(
    @Args('id') id: string,
    @Args('input') updateEventInput: UpdateEventInput,
  ) {
    try {
      return await this.eventService.update(+id, updateEventInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Event)
  async deleteEvent(@Args('id') id: string) {
    try {
      return await this.eventService.delete(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR')
  @Mutation(() => Event)
  async addOrganizator(
    @Args('input') createAccountEventInput: CreateAccountEventInput,
  ) {
    try {
      return await this.eventService.addOrganizarator(createAccountEventInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('ADMIN', 'EDITOR')
  @Mutation(() => Activity)
  async deleteActivity(
    @Args('input') deleteActivityInput: CreateActivityInput,
  ) {
    try {
      return await this.eventService.deleteActivity(
        deleteActivityInput as Partial<CreateActivityInput>,
      );
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ResolveField(() => Ticket, { nullable: true })
  async ticket(@Parent() event: Event) {
    try {
      return await this.ticketService.getTicketsByEvent(event.id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
