import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AccountResolver],
})
export class AccountModule {}
