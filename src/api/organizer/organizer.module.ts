import { Module } from '@nestjs/common';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { OrganizerService } from './organizer.service';
import { AuthModule } from '../auth/auth.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { SmsService } from 'src/utils/sms.service';
import { EventService } from '../event/event.service';
import { TeamService } from '../team/team.service';

@Module({
  imports: [PrismaModule, AuthModule, MinioModule],
  providers: [
    OrganizerResolver,
    OrganizerService,
    SmsService,
    EventService,
    TeamService,
  ],
})
export class OrganizerModule {}
