import { Module } from '@nestjs/common';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { OrganizerService } from './organizer.service';
import { AuthModule } from '../auth/auth.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { SmsService } from 'src/utils/sms.service';

@Module({
  imports: [PrismaModule, AuthModule, MinioModule],
  providers: [OrganizerResolver, OrganizerService, SmsService],
})
export class OrganizerModule {}
