import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { EventModule } from '../event/event.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { TeamModule } from '../team/team.module';

@Module({
  imports: [PrismaModule, MinioModule, EventModule, TeamModule],
  providers: [TicketResolver, TicketService],
})
export class TicketModule {}
