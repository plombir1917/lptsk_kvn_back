import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './api/auth/guards/roles.guard';
import { JwtService } from '@nestjs/jwt';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: true,
    preflightContinue: true,
    allowedHeaders: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(new RolesGuard(app.get(JwtService), app.get(Reflector)));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.use(graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));

  await app.listen(process.env.APPLICATION_PORT);
}
bootstrap();
