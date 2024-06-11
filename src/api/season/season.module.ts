import { Module } from '@nestjs/common';
import { SeasonService } from './season.service';
import { SeasonResolver } from './season.resolver';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SeasonResolver, SeasonService],
})
export class SeasonModule {}
