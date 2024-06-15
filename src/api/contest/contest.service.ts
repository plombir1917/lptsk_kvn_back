import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContestInput } from './dto/create-contest.input';
import { UpdateContestInput } from './dto/update-contest.input';
import { PrismaService } from 'src/database/prisma.service';
import { AlreadyExistError } from 'src/errors/already-exist.error';
import { NotFoundError } from 'src/errors/not-found.error';

@Injectable()
export class ContestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContestInput: CreateContestInput) {
    try {
      return await this.prisma.contest.create({ data: createContestInput });
    } catch (error) {
      throw new AlreadyExistError('Contest');
    }
  }

  async findAll() {
    try {
      const contests = await this.prisma.contest.findMany();
      if (!contests.length) throw new Error();
      return contests;
    } catch (error) {
      throw new NotFoundError('Contest');
    }
  }

  async update(id: number, updateContestInput: UpdateContestInput) {
    try {
      return await this.prisma.contest.update({
        where: { id },
        data: updateContestInput,
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.contest.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundError('Contest');
    }
  }
}
