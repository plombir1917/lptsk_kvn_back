import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAccountInput } from './dto/create-account.input';
import { Account } from './account.entity';
import { AccountExistError } from 'src/errors/account-exist.error';

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<Account> {
    try {
      return await this.prisma.account.create({
        data: {
          ...createAccountInput,
        },
      });
    } catch (error) {
      switch (error.code) {
        case 'P2002':
          throw new AccountExistError(createAccountInput.login);
        default:
          throw error;
      }
    }
  }

  async getAccountById(id: string): Promise<Account> {
    return await this.prisma.account.findUnique({
      where: {
        id,
      },
    });
  }

  async getAccounts(): Promise<Account[]> {
    return await this.prisma.account.findMany();
  }

  async updateAccount(id: string, account: Account): Promise<Account> {
    return await this.prisma.account.update({
      where: {
        id,
      },
      data: {
        ...account,
      },
    });
  }

  async deleteAccount(id: string): Promise<Account> {
    return await this.prisma.account.delete({
      where: {
        id,
      },
    });
  }
}
