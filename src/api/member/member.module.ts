import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberResolver } from './member.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [PrismaModule, MinioModule, TeamModule],
  providers: [MemberResolver, MemberService],
})
export class MemberModule {}
