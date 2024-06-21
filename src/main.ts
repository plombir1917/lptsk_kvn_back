import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './api/auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as bodyParser from 'body-parser';
import { ContentTypeMiddleware } from './middlewares/content-type.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new ContentTypeMiddleware().use);
  app.enableCors({ origin: true });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RolesGuard(app.get(JwtService), app.get(Reflector)));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(
    graphqlUploadExpress('/graphql', { maxFileSize: 100000000, maxFiles: 10 }),
  );

  await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
