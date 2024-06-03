import { Injectable } from '@nestjs/common';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createNewsInput: CreateNewsInput) {
    return this.prisma.news.create({ data: createNewsInput });
  }

  findAll() {
    return this.prisma.news.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} news`;
  }

  update(id: number, updateNewsInput: UpdateNewsInput) {
    return `This action updates a #${id} news`;
  }

  remove(id: number) {
    return `This action removes a #${id} news`;
  }
}
