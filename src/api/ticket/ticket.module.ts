import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketResolver } from './ticket.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { EventModule } from '../event/event.module';
import { EventService } from '../event/event.service';
import { MinioModule } from 'src/utils/minio/minio.module';

@Module({
  imports: [PrismaModule, EventModule, MinioModule],
  providers: [TicketResolver, TicketService, EventService],
})
export class TicketModule {}
