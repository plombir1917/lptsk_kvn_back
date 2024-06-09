import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { AccountService } from './account.service';
import { AuthModule } from '../auth/auth.module';
import { MinioModule } from 'src/utils/minio/minio.module';
import { SmsService } from 'src/utils/sms.service';

@Module({
  imports: [PrismaModule, AuthModule, MinioModule],
  providers: [AccountResolver, AccountService, SmsService],
})
export class AccountModule {}
