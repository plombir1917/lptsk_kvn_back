import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTicketInput: CreateTicketInput) {
    return await this.prisma.ticket.create({
      data: createTicketInput,
    });
  }

  async findAll() {
    return await this.prisma.ticket.findMany();
  }
  async getTicketsByEvent(event_id: number) {
    return await this.prisma.ticket.findFirstOrThrow({
      where: {
        event_id: event_id,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketInput: UpdateTicketInput) {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketInput,
    });
  }

  remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } });
  }
}
