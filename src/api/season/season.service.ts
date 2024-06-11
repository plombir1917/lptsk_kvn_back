import { Injectable } from '@nestjs/common';
import { CreateSeasonInput } from './dto/create-season.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SeasonService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSeasonInput: CreateSeasonInput) {
    return await this.prisma.season.create({ data: createSeasonInput });
  }

  async findAll() {
    return await this.prisma.season.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.season.findUnique({ where: { id } });
  }

  async update(id: number, updateSeasonInput: UpdateSeasonInput) {
    return await this.prisma.season.update({
      where: { id },
      data: updateSeasonInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.season.delete({ where: { id } });
  }
}
