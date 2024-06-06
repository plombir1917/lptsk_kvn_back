import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsDateString, IsNotEmpty, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/upload/file-upload.interface';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Date)
  @IsDate()
  date: string;

  @Field(() => String)
  @IsString()
  place: string;

  @Field(() => String)
  @IsString()
  description: string;

  @Field(() => GraphQLUpload)
  @IsNotEmpty()
  photo: Promise<FileUpload>;

  @Field(() => String)
  @IsString()
  link: string;
}
