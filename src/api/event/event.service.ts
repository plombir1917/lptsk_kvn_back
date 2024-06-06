import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { PrismaService } from 'src/database/prisma.service';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createEventInput: CreateEventInput) {
    try {
      const { createReadStream, filename } = await createEventInput.photo;

      const writeStream = createWriteStream(
        join(process.cwd(), `./src/upload/${filename}`),
      );

      createReadStream().pipe(writeStream);

      try {
        await new Promise((resolve) => writeStream.on('finish', resolve));
      } catch (error) {
        throw new BadRequestException('Could not save image');
      }
      return this.prisma.event.create({
        data: { ...createEventInput, photo: filename },
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
    return `This action returns a #${id} event`;
  }

  async update(id: number, event: UpdateEventInput) {
    if (event.photo) {
      const { createReadStream, filename } = await event.photo;

      const writeStream = createWriteStream(
        join(process.cwd(), `./src/upload/${filename}`),
      );

      createReadStream().pipe(writeStream);
      try {
        await new Promise((resolve) => writeStream.on('finish', resolve));
        return await this.prisma.event.update({
          where: {
            id,
          },
          data: {
            ...event,
            photo: filename,
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
}
