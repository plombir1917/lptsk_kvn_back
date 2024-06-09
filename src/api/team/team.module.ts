import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { MinioModule } from 'src/utils/minio/minio.module';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [MinioModule, PrismaModule],
  providers: [TeamResolver, TeamService],
})
export class TeamModule {}
