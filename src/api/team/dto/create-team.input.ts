import { InputType, Int, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'graphql-upload/GraphQLUpload.js';

@InputType()
export class CreateTeamInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  achievments: string;

  @Field(() => String)
  home: string;

  @Field(() => Int)
  rate: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => GraphQLUpload)
  photo: Promise<FileUpload>;
}
