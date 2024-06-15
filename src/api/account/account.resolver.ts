import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Account } from './account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { AccountService } from './account.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from '../auth/decorators/user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateAccountInput } from './dto/update-account.input';
import { ChangePasswordInput } from './dto/change-password.input';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Roles('DIRECTOR')
  @Mutation(() => Account)
  async createAccount(@Args('input') input: CreateAccountInput) {
    try {
      return await this.accountService.createAccount(input);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('DIRECTOR', 'EDITOR', 'ADMIN')
  @Query(() => Account)
  async getAccountById(@Args('id') id: string) {
    try {
      return await this.accountService.getAccountById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR', 'EDITOR', 'ADMIN')
  @Query(() => Account)
  async getAccountByToken(@User() token: string) {
    try {
      return await this.accountService.getAccountById(token);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR')
  @Query(() => [Account])
  async getAccounts() {
    try {
      return await this.accountService.getAccounts();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR', 'EDITOR', 'ADMIN')
  @Mutation(() => Account)
  async updateAccount(
    @Args('id') id: string,
    @Args('input') input: UpdateAccountInput,
  ) {
    try {
      return await this.accountService.updateAccount(id, input);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR')
  @Mutation(() => Account)
  async deleteAccount(@Args('id') id: string) {
    try {
      return await this.accountService.deleteAccount(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR', 'EDITOR', 'ADMIN')
  @Mutation(() => Account)
  async changePassword(@Args('input') input: ChangePasswordInput) {
    try {
      return await this.accountService.changePassword(input);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
