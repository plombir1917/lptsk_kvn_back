import { Injectable } from '@nestjs/common';
import { CreateTeamInput } from './dto/create-team.input';
import { UpdateTeamInput } from './dto/update-team.input';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from 'src/utils/minio/minio.service';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class TeamService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}

  async create(createTeamInput: CreateTeamInput) {
    try {
      await this.minio.uploadPhoto(createTeamInput.photo);

      const fileLink = await this.minio.getFileLink(
        (await createTeamInput.photo).filename,
      );

      return await this.prisma.team.create({
        data: {
          ...createTeamInput,
          photo: fileLink,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.team.findMany();
    } catch (error) {
      throw new NotFoundError('Team');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.team.findUnique({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Team');
    }
  }

  async update(id: number, updateTeamInput: UpdateTeamInput) {
    try {
      if (updateTeamInput.photo) {
        this.minio.uploadPhoto(updateTeamInput.photo);

        const fileLink = this.minio.getFileLink(
          (await updateTeamInput.photo).filename,
        );

        return this.prisma.team.update({
          where: { id },
          data: {
            ...updateTeamInput,
            photo: await fileLink,
          },
        });
      }

      return this.prisma.team.update({
        where: { id },
        data: {
          achievments: updateTeamInput.achievments,
          home: updateTeamInput.home,
          name: updateTeamInput.name,
          rate: updateTeamInput.rate,
          active: updateTeamInput.active,
        },
      });
    } catch (error) {
      throw new NotFoundError('Team');
    }
  }

  async remove(id: number) {
    try {
      return this.prisma.team.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Team');
    }
  }
}
