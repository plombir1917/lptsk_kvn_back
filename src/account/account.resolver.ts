import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma.service';

@Resolver('Account')
export class AccountResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => String)
  async getAccounts() {
    return 'оно живое';
  }
}
