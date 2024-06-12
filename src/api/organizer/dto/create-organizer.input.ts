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
export class CreateOrganizerInput {
  @Field()
  account_id: string;

  @Field()
  event_id: number;
}
