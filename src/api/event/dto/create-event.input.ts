import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/upload/file-upload.interface';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => Date)
  @IsDate()
  date: Date;

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
