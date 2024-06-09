import { InputType, Int, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => GraphQLUpload)
  photo: Promise<FileUpload>;

  @Field(() => Int)
  team_id: number;
}
