import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { PrismaService } from 'src/database/prisma.service';
import { AlreadyExistError } from 'src/errors/already-exist.error';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketInput: CreateTicketInput) {
    try {
      return await this.prisma.ticket.create({
        data: createTicketInput,
      });
    } catch (error) {
      throw new AlreadyExistError('Ticket');
    }
  }

  async findAll() {
    const tickets = await this.prisma.ticket.findMany();
    if (!tickets.length) throw new NotFoundError('Ticket');
    return tickets;
  }

  async getTicketsByEvent(event_id: number) {
    try {
      return await this.prisma.ticket.findFirstOrThrow({
        where: {
          event_id: event_id,
        },
      });
    } catch (error) {
      throw new NotFoundError('Ticket');
    }
  }

  async update(id: number, updateTicketInput: UpdateTicketInput) {
    try {
      return await this.prisma.ticket.update({
        where: { id },
        data: updateTicketInput,
      });
    } catch (error) {
      throw new NotFoundError('Ticket');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.ticket.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Ticket');
    }
  }
}
