import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateEventInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  place: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => GraphQLUpload)
  @IsNotEmpty()
  photo: Promise<FileUpload>;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  link: string;
}
