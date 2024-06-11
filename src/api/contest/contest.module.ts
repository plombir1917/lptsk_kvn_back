import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestResolver } from './contest.resolver';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContestResolver, ContestService],
})
export class ContestModule {}
