import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  login: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @Field()
  @IsStrongPassword()
  @IsNotEmpty()
  newPassword: string;
}
