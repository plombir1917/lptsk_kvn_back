import { InputType, Int, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateNewsInput {
  @Field()
  title: string;

  @Field()
  link: string;

  @Field((type) => GraphQLUpload)
  photo: Promise<FileUpload>;

  @Field()
  season_id: number;
}
