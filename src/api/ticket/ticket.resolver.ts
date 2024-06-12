import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TicketService } from './ticket.service';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { EventService } from '../event/event.service';
import { Event } from '../event/entities/event.entity';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(
    private readonly ticketService: TicketService,
    private readonly eventService: EventService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Ticket)
  createTicket(@Args('input') createTicketInput: CreateTicketInput) {
    return this.ticketService.create(createTicketInput);
  }

  @Query(() => [Ticket])
  getTickets() {
    return this.ticketService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketService.findOne(id);
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Ticket)
  updateTicket(
    @Args('id') id: number,
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketService.update(id, updateTicketInput);
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Ticket)
  deleteTicket(@Args('id', { type: () => Int }) id: number) {
    return this.ticketService.remove(id);
  }

  @ResolveField(() => Event)
  event(@Parent() ticket: Ticket) {
    return this.eventService.findOne(ticket.event_id);
  }
}
