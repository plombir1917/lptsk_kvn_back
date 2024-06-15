import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  achievments: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  home: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @Field(() => GraphQLUpload)
  @IsNotEmpty()
  photo: Promise<FileUpload>;
}
