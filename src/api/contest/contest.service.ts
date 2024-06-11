import { Injectable } from '@nestjs/common';
import { CreateContestInput } from './dto/create-contest.input';
import { UpdateContestInput } from './dto/update-contest.input';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ContestService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createContestInput: CreateContestInput) {
    return await this.prisma.contest.create({ data: createContestInput });
  }

  async findAll() {
    return await this.prisma.contest.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.contest.findUnique({ where: { id } });
  }

  async update(id: number, updateContestInput: UpdateContestInput) {
    return await this.prisma.contest.update({
      where: { id },
      data: updateContestInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.contest.delete({ where: { id } });
  }
}
