import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginAccountInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
