import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const context = GqlExecutionContext.create(ctx);
      const gQlContext = context.getContext();
      const requieredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requieredRoles) {
        return true;
      }
      const req = gQlContext.req;
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return false;
      }
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        return false;
      }
      const user = this.jwtService.verify(token);
      req.user = user;
      const role = user.role;
      console.log(role);
      return !!requieredRoles.includes(role);
    } catch (e) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
  }
}
