import { Injectable } from '@nestjs/common';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from 'src/utils/minio/minio.service';

@Injectable()
export class MemberService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}
  async create(createMemberInput: CreateMemberInput) {
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
  }

  async findAll() {
    return await this.prisma.member.findMany();
  }

  findOne(id: string) {
    return this.prisma.member.findUnique({ where: { id } });
  }

  async update(id: string, updateMemberInput: UpdateMemberInput) {
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
    return `This action updates a #${id} member`;
  }

  remove(id: string) {
    return this.prisma.member.delete({ where: { id } });
  }
}
