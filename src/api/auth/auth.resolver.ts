import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginAccountInput } from './dto/login-account.input';
import { UnauthorizedException } from '@nestjs/common';
import { LoginAccountResponse } from './dto/login-account.response';
import { ChangePasswordInput } from './dto/change-password.input';
import { Account } from '../account/account.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginAccountResponse)
  async login(@Args('input') input: LoginAccountInput) {
    try {
      const account = await this.authService.validateAccount(input);
      return await this.authService.login(account);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(error.message);
    }
  }

  @Mutation(() => Account)
  async changePassword(@Args('input') input: ChangePasswordInput) {
    return await this.authService.changePassword(input);
  }
}
