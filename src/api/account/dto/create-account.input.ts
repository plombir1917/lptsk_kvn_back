import { Field, InputType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';
@InputType()
export class CreateAccountInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  surname: string;

  @Field({ nullable: true })
  @IsPhoneNumber('RU')
  @IsOptional()
  phone?: string;

  @Field()
  @IsNotEmpty()
  login: string;

  @Field()
  @IsStrongPassword()
  password: string;

  @Field(() => GraphQLUpload)
  @IsNotEmpty()
  photo: Promise<FileUpload>;

  @Field()
  @IsEnum($Enums.roles)
  role: $Enums.roles;
}
