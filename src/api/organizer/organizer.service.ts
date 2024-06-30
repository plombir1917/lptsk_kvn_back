import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import { Workbook } from 'exceljs';
import { NotFoundError } from 'src/errors/not-found.error';
import { MinioService } from 'src/utils/minio/minio.service';
import { EventService } from '../event/event.service';
import { AlreadyExistError } from 'src/errors/already-exist.error';

@Injectable()
export class OrganizerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
    private readonly eventService: EventService,
  ) {}

  async createOrganizer(createOrganizerInput: CreateOrganizerInput) {
    try {
      return await this.prisma.account_event.create({
        data: {
          account: { connect: { id: createOrganizerInput.account_id } },
          event: { connect: { id: createOrganizerInput.event_id } },
          responsibility: createOrganizerInput.responsibility,
        },
      });
    } catch (error) {
      throw new AlreadyExistError('Organizer');
    }
  }

  async getEventsByOrganizerId(id: string) {
    try {
      return await this.prisma.account_event.findMany({
        where: {
          account_id: id,
        },
        select: {
          event: true,
        },
      });
    } catch (error) {
      throw new NotFoundError('Organizer');
    }
  }

  async downloadExcel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Организаторы');

    worksheet.columns = [
      { header: 'Организатор', key: 'organizer', width: 30 },
      { header: 'Ответственность', key: 'responsibility', width: 30 },
      { header: 'Мероприятие', key: 'event', width: 30 },
      { header: 'Создано', key: 'created_at', width: 30 },
      { header: 'Проведено', key: 'date', width: 30 },
    ];

    const organizers = await this.prisma.account.findMany({
      include: {
        events: true,
      },
    });

    const rows = organizers.flatMap((organizer) =>
      organizer.events.map(async (event) => ({
        organizer: `${organizer.name} ${organizer.surname}`,
        responsibility: event.responsibility,
        event: (await this.eventService.findOne(event.event_id)).name,
        created_at: (await this.eventService.findOne(event.event_id))
          .created_at,
        date: (await this.eventService.findOne(event.event_id)).date,
      })),
    );

    worksheet.addRows(await Promise.all(rows));

    const buffer: Buffer = (await workbook.xlsx.writeBuffer()) as Buffer;
    const filename = `organizers_${Date.now()}.xlsx`;

    const fileUrl = await this.minio.uploadFile(
      buffer,
      filename,
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );

    return fileUrl;
  }

  async getOrganizers() {
    try {
      return await this.prisma.account_event.findMany({
        include: {
          account: true,
          event: true,
        },
      });
    } catch (error) {
      throw new NotFoundError('Organizer');
    }
  }

  async updateOrganizer(updateOrganizerInput: UpdateOrganizerInput) {
    try {
      return await this.prisma.account_event.update({
        where: {
          account_id_event_id: {
            account_id: updateOrganizerInput.account_id,
            event_id: updateOrganizerInput.event_id,
          },
        },
        data: {
          ...updateOrganizerInput,
        },
      });
    } catch (error) {
      throw new NotFoundError('Organizer');
    }
  }

  async deleteOrganizer(createOrganizerInput: CreateOrganizerInput) {
    try {
      return await this.prisma.account_event.delete({
        where: {
          account_id_event_id: {
            account_id: createOrganizerInput.account_id,
            event_id: createOrganizerInput.event_id,
          },
        },
      });
    } catch (error) {
      throw new NotFoundError('Organizer');
    }
  }
}
