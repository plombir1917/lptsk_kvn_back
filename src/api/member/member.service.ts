import { Injectable } from '@nestjs/common';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from 'src/utils/minio/minio.service';
import { AlreadyExistError } from 'src/errors/already-exist.error';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}
  async create(createMemberInput: CreateMemberInput) {
    try {
      await this.minio.uploadFile(createMemberInput.photo);
      const fileLink = await this.minio.getFileLink(
        (await createMemberInput.photo).filename,
      );
      return await this.prisma.member.create({
        data: {
          ...createMemberInput,
          photo: fileLink,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.member.findMany();
    } catch (error) {
      throw new NotFoundError('Member');
    }
  }

  async update(id: string, updateMemberInput: UpdateMemberInput) {
    try {
      if (updateMemberInput.photo) {
        this.minio.uploadFile(updateMemberInput.photo);
        const fileLink = await this.minio.getFileLink(
          (await updateMemberInput.photo).filename,
        );
        return this.prisma.member.update({
          where: { id },
          data: {
            ...updateMemberInput,
            photo: fileLink,
          },
        });
      }
      return this.prisma.member.update({
        where: { id },
        data: {
          name: updateMemberInput.name,
          phone: updateMemberInput.phone,
          team_id: updateMemberInput.team_id,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.member.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Member');
    }
  }
}
