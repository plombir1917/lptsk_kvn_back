import { Injectable } from '@nestjs/common';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from 'src/utils/minio/minio.service';

@Injectable()
export class NewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}
  async create(createNewsInput: CreateNewsInput) {
    await this.minio.uploadFile(createNewsInput.photo);
    const fileLink = await this.minio.getFileLink(
      (await createNewsInput.photo).filename,
    );
    return await this.prisma.news.create({
      data: {
        ...createNewsInput,
        photo: fileLink,
      },
    });
  }

  async findAll() {
    return await this.prisma.news.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.news.findUnique({ where: { id } });
  }

  async update(id: number, updateNewsInput: UpdateNewsInput) {
    if (updateNewsInput.photo) {
      await this.minio.uploadFile(updateNewsInput.photo);
      const fileLink = await this.minio.getFileLink(
        (await updateNewsInput.photo).filename,
      );
      return await this.prisma.news.update({
        where: { id },
        data: {
          ...updateNewsInput,
          photo: fileLink,
        },
      });
    }
    return await this.prisma.news.update({
      where: { id },
      data: {
        id: id,
        link: updateNewsInput.link,
        title: updateNewsInput.title,
        season_id: updateNewsInput.season_id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.news.delete({ where: { id } });
  }
}
