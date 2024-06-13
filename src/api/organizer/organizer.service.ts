import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { Organizer } from './organizer.entity';
import { encodePassword } from 'src/utils/bcrypt';
import { MinioService } from 'src/utils/minio/minio.service';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
import { SmsService } from 'src/utils/sms.service';

@Injectable()
export class OrganizerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
    private readonly sms: SmsService,
  ) {}

  async createOrganizer(createOrganizerInput: CreateOrganizerInput) {
    try {
      return await this.prisma.account_event.create({
        data: {
          account: { connect: { id: createOrganizerInput.account_id } },
          event: { connect: { id: createOrganizerInput.event_id } },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getEventsByOrganizerId(id: string) {
    const events = await this.prisma.account_event.findMany({
      where: {
        account_id: id,
      },
      select: {
        event: true,
      },
    });
    return events;
  }

  async getOrganizers() {
    const organizers = await this.prisma.account_event.findMany({
      include: {
        account: true,
        event: true,
      },
    });
    return organizers;
  }

  async updateOrganizer(updateOrganizerInput: UpdateOrganizerInput) {
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
  }

  async deleteOrganizer(createOrganizerInput: CreateOrganizerInput) {
    return await this.prisma.account_event.delete({
      where: {
        account_id_event_id: {
          account_id: createOrganizerInput.account_id,
          event_id: createOrganizerInput.event_id,
        },
      },
    });
  }
}
