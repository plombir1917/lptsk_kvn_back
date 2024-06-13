import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { TicketService } from '../ticket/ticket.service';
import { TeamService } from '../team/team.service';

@Module({
  imports: [PrismaModule, MinioModule],
  providers: [EventResolver, EventService, TicketService, TeamService],
  exports: [EventService],
})
export class EventModule {}
