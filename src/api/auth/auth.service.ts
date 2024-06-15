import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';
import { NotFoundError } from 'src/errors/not-found.error';
import { comparePassword } from 'src/utils/bcrypt';
import { LoginAccountInput } from './dto/login-account.input';
import { Account } from '../account/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(data: LoginAccountInput) {
    try {
      const account = await this.prisma.account.findUniqueOrThrow({
        where: {
          login: data.login,
        },
      });

      await comparePassword(data.password, account.password); // throw error if wrong password

      return account;
    } catch (error) {
      switch (error.code) {
        case 'P2025':
          throw new NotFoundError('Account');
        default:
          throw error;
      }
    }
  }

  async login(data: Account) {
    return {
      access_token: this.jwtService.sign({ id: data.id, role: data.role }),
    };
  }

  async decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
}
