import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const grphQlContext = context.getContext();
    const req = grphQlContext.req;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return '';
    }

    const token = authHeader.split(' ')[1];

    return token;
  },
);
