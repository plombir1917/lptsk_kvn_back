import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma.service';
import { Account } from './account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { AccountService } from './account.service';
import {
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @UsePipes(new ValidationPipe())
  @Mutation(() => Account)
  async createAccount(@Args('input') input: CreateAccountInput) {
    try {
      return await this.accountService.createAccount(input);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid data!');
    }
  }

  @Query(() => Account)
  async getAccountById(@Args('id') id: string) {
    try {
      return await this.accountService.getAccountById(id);
    } catch (error) {
      throw new NotFoundException('Account not found!');
    }
  }

  @Query(() => [Account])
  async getAccounts() {
    return await this.accountService.getAccounts();
  }
}
