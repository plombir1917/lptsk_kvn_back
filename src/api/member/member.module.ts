import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { TeamService } from '../team/team.service';

@Module({
  imports: [PrismaModule, MinioModule],
  providers: [MemberResolver, MemberService, TeamService],
})
export class MemberModule {}
