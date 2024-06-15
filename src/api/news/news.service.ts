import { Injectable } from '@nestjs/common';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { PrismaService } from 'src/database/prisma.service';
import { MinioService } from 'src/utils/minio/minio.service';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class NewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minio: MinioService,
  ) {}
  async create(createNewsInput: CreateNewsInput) {
    try {
      await this.minio.uploadPhoto(createNewsInput.photo);
      const fileLink = await this.minio.getFileLink(
        (await createNewsInput.photo).filename,
      );
      return await this.prisma.news.create({
        data: {
          ...createNewsInput,
          photo: fileLink,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await this.prisma.news.findMany();
    } catch (error) {
      throw new NotFoundError('News');
    }
  }

  async update(id: number, updateNewsInput: UpdateNewsInput) {
    try {
      if (updateNewsInput.photo) {
        await this.minio.uploadPhoto(updateNewsInput.photo);
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
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.news.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('News');
    }
  }
}
