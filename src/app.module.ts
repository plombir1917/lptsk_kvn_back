import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/database/prisma.module';
import { ApiModule } from './api/api.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      path: '/graphql',
      introspection: true,
      formatError: (error: GraphQLError) => {
        const formattedError: GraphQLFormattedError = {
          message: error.message,

          extensions: {
            ...error.extensions,
          },
        };
        delete formattedError.extensions.stacktrace;

        return formattedError;
      },
    }),
    PrismaModule,
    ApiModule,
  ],
})
export class AppModule {}
