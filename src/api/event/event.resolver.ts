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

@Resolver(() => Event)
export class EventResolver {
  constructor(
    private readonly eventService: EventService,
    private readonly ticketService: TicketService,
  ) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Event)
  createEvent(@Args('input') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event])
  getEvents() {
    return this.eventService.findAll();
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => Event)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Event)
  updateEvent(
    @Args('id') id: string,
    @Args('input') updateEventInput: UpdateEventInput,
  ) {
    return this.eventService.update(+id, updateEventInput);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Event)
  deleteEvent(@Args('id') id: string) {
    return this.eventService.delete(+id);
  }

  @Mutation(() => Event)
  addOrganizator(
    @Args('input') createAccountEventInput: CreateAccountEventInput,
  ) {
    return this.eventService.addOrganizarator(createAccountEventInput);
  }

  @ResolveField(() => Ticket)
  async ticket(@Parent() event: Event) {
    return await this.ticketService.getTicketsByEvent(event.id);
  }
}
