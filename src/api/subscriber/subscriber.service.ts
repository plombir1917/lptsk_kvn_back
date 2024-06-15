import { Injectable } from '@nestjs/common';
import { CreateSubscriberInput } from './dto/create-subscriber.input';
import { UpdateSubscriberInput } from './dto/update-subscriber.input';
import { PrismaService } from 'src/database/prisma.service';
import { AlreadyExistError } from 'src/errors/already-exist.error';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class SubscriberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubscriberInput: CreateSubscriberInput) {
    try {
      return await this.prisma.subscriber.create({
        data: createSubscriberInput,
      });
    } catch (error) {
      throw new AlreadyExistError('Subscriber');
    }
  }

  async findAll() {
    try {
      return await this.prisma.subscriber.findMany();
    } catch (error) {
      throw new NotFoundError('Subscriber');
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.subscriber.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Subscriber');
    }
  }

  async update(id: string, updateSubscriberInput: UpdateSubscriberInput) {
    try {
      return await this.prisma.subscriber.update({
        where: { id },
        data: updateSubscriberInput,
      });
    } catch (error) {
      throw new NotFoundError('Subscriber');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.subscriber.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Subscriber');
    }
  }
}
