import { Field, InputType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/upload/file-upload.interface';

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
  @IsString()
  role: $Enums.roles;
}
