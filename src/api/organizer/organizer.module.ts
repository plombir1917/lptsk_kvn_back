import { Module } from '@nestjs/common';
import { OrganizerResolver } from './organizer.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { OrganizerService } from './organizer.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [OrganizerResolver, OrganizerService],
})
export class OrganizerModule {}
