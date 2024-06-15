import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { MinioModule } from 'src/utils/minio/minio.module';
import { PrismaModule } from 'src/database/prisma.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [MinioModule, PrismaModule, EventModule],
  providers: [TeamResolver, TeamService],
  exports: [TeamService],
})
export class TeamModule {}
