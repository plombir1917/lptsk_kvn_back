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
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(
    private readonly ticketService: TicketService,
    private readonly eventService: EventService,
  ) {}

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Ticket)
  async createTicket(@Args('input') createTicketInput: CreateTicketInput) {
    try {
      return await this.ticketService.create(createTicketInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [Ticket])
  async getTickets() {
    try {
      return this.ticketService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Ticket)
  async updateTicket(
    @Args('id') id: number,
    @Args('updateTicketInput') updateTicketInput: UpdateTicketInput,
  ) {
    try {
      return await this.ticketService.update(id, updateTicketInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Ticket)
  async deleteTicket(@Args('id', { type: () => Int }) id: number) {
    try {
      return await this.ticketService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ResolveField(() => Event)
  event(@Parent() ticket: Ticket) {
    return this.eventService.findOne(ticket.event_id);
  }
}
