import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberResolver } from './subscriber.resolver';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SubscriberResolver, SubscriberService],
})
export class SubscriberModule {}
