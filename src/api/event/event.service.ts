import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from 'src/utils/minio/minio.service';
import { CreateAccountEventInput } from './dto/create-account-event.input';
import { CreateActivityInput } from './dto/create-activity.input';
import { Activity } from './entities/activity.entity';
import { TeamService } from '../team/team.service';
import { AlreadyExistError } from 'src/errors/already-exist.error';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class EventService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
    private readonly teamService: TeamService,
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
      throw new AlreadyExistError('Event');
    }
  }

  async createActivity(createActivityInput: CreateActivityInput) {
    try {
      const activity: Activity = await this.prisma.team_event.create({
        data: {
          event: { connect: { id: createActivityInput.event_id } },
          team: { connect: { id: createActivityInput.team_id } },
          team_rate: createActivityInput.team_rate,
        },
        include: { event: true, team: true },
      });

      if (!activity) throw new Error();
      return await this.addTeamRate(activity);
    } catch (error) {
      throw new AlreadyExistError('Activity');
    }
  }

  async addTeamRate(activity: Activity) {
    try {
      await this.teamService.update(activity.team_id, {
        rate: activity.team_rate + activity.team.rate,
      });
      return activity;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      const events = await this.prisma.event.findMany();
      if (!events.length) throw new Error('Events not found');
      return events;
    } catch (error) {
      throw new NotFoundError('Event');
    }
  }

  async deleteActivity(deleteActivityInput: Partial<CreateActivityInput>) {
    try {
      return await this.prisma.team_event.delete({
        where: {
          team_id_event_id: {
            team_id: deleteActivityInput.team_id,
            event_id: deleteActivityInput.event_id,
          },
        },
      });
    } catch (error) {
      throw new NotFoundError('Event');
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.event.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Event');
    }
  }

  async findManyByTeamId(team_id: number) {
    try {
      const events = await this.prisma.team_event.findMany({
        where: { team_id: team_id },
        include: { event: true },
      });
      if (!events.length) throw new Error('Events not found');
      return events;
    } catch (error) {
      throw new NotFoundError('Event');
    }
  }

  async update(id: number, event: UpdateEventInput) {
    try {
      if (event.photo) {
        try {
          await this.minio.uploadFile(event.photo);

          const fileLink = await this.minio.getFileLink(
            (await event.photo).filename,
          );
          return await this.prisma.event.update({
            where: {
              id,
            },
            data: {
              ...event,
              photo: fileLink,
            },
          });
        } catch (error) {
          throw new Error('Could not save image');
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
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundError('Event');
    }
  }

  async addOrganizarator(createAccountEventInput: CreateAccountEventInput) {
    try {
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
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
