import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import { Workbook } from 'exceljs';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class OrganizerService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganizer(createOrganizerInput: CreateOrganizerInput) {
    try {
      return await this.prisma.account_event.create({
        data: {
          account: { connect: { id: createOrganizerInput.account_id } },
          event: { connect: { id: createOrganizerInput.event_id } },
        },
      });
    } catch (error) {
      throw new Error(error.message);
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
      { header: 'account.name', key: 'account', width: 25 },
      { header: 'event.name', key: 'event', width: 25 },
    ];
    const organizers = await this.getOrganizers();

    worksheet.addRows(organizers);
    console.log(await workbook.xlsx.writeFile('organizers.xlsx'));
    return workbook.xlsx.writeBuffer();
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
