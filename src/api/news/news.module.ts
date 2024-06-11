import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { PrismaModule } from 'src/database/prisma.module';
import { MinioModule } from 'src/utils/minio/minio.module';

@Module({
  imports: [PrismaModule, MinioModule],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
