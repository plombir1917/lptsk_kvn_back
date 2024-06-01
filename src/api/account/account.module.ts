import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { PrismaService } from 'src/database/prisma.service';
import { AccountService } from './account.service';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [AccountResolver, AccountService, PrismaService],
})
export class AccountModule {}
