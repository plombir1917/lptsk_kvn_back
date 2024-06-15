import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAccountInput } from './dto/login-account.input';
import { UnauthorizedException } from '@nestjs/common';
import { LoginAccountResponse } from './dto/login-account.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginAccountResponse)
  async login(@Args('input') input: LoginAccountInput) {
    try {
      const account = await this.authService.validateAccount(input);
      return await this.authService.login(account);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
