import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { AccountService } from './account.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => Account)
  async createAccount(@Args('input') input: CreateAccountInput) {
    try {
      return await this.accountService.createAccount(input);
    } catch (error) {
      throw new BadRequestException(error.message);
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
