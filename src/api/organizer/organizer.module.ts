import { Module } from '@nestjs/common';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { OrganizerService } from './organizer.service';
import { AuthModule } from '../auth/auth.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { EventModule } from '../event/event.module';

@Module({
  imports: [PrismaModule, AuthModule, MinioModule, EventModule],
  providers: [OrganizerResolver, OrganizerService],
})
export class OrganizerModule {}
