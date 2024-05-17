import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma.service';
import { Account } from './account.entity';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Mutation(() => Account)
  async createAccount() {}

  @Query(() => String)
  async getAccounts() {
    return 'оно живое';
  }
}
