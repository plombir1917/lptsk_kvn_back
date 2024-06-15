import { Injectable } from '@nestjs/common';
import { CreateSeasonInput } from './dto/create-season.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { PrismaService } from 'src/database/prisma.service';
import { AlreadyExistError } from 'src/errors/already-exist.error';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class SeasonService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createSeasonInput: CreateSeasonInput) {
    try {
      return await this.prisma.season.create({ data: createSeasonInput });
    } catch (error) {
      throw new AlreadyExistError('Season');
    }
  }

  async findAll() {
    try {
      return await this.prisma.season.findMany();
    } catch (error) {
      throw new NotFoundError('Season');
    }
  }

  async update(id: number, updateSeasonInput: UpdateSeasonInput) {
    try {
      return await this.prisma.season.update({
        where: { id },
        data: updateSeasonInput,
      });
    } catch (error) {
      throw new NotFoundError('Season');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.season.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Season');
    }
  }
}
