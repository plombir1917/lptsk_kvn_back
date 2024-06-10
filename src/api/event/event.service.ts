import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from 'src/utils/minio/minio.service';
import { CreateAccountEventInput } from './dto/create-account-event.input';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}
  async create(createEventInput: CreateEventInput) {
    try {
      await createEventInput.photo;
      await this.minio.uploadFile(createEventInput.photo);
      const fileLink = await this.minio.getFileLink(
        (await createEventInput.photo).filename,
      );

      return this.prisma.event.create({
        data: {
          ...createEventInput,
          photo: fileLink,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    const events = await this.prisma.event.findMany();
    if (!events.length) throw new Error('Events not found');
    return events;
  }

  findOne(id: number) {
    return this.prisma.event.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, event: UpdateEventInput) {
    if (event.photo) {
      try {
        await this.minio.uploadFile(event.photo);

        const filLink = (await event.photo).filename;
        return await this.prisma.event.update({
          where: {
            id,
          },
          data: {
            ...event,
            photo: filLink,
          },
        });
      } catch (error) {
        throw new BadRequestException('Could not save image');
      }
    }
    return await this.prisma.event.update({
      where: { id },
      data: {
        name: event.name,
        date: event.date,
        place: event.place,
        description: event.description,
        link: event.link,
      },
    });
  }

  async delete(id: number) {
    return await this.prisma.event.delete({
      where: { id },
    });
  }

  async addOrganizarator(createAccountEventInput: CreateAccountEventInput) {
    return await this.prisma.account_event.create({
      data: {
        account: { connect: { id: createAccountEventInput.account_id } },
        event: { connect: { id: createAccountEventInput.event_id } },
      },
      include: {
        event: true,
        account: true,
      },
    });
  }
}
