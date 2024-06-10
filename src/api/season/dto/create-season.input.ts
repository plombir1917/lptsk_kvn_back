import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSeasonInput {
  @Field(() => Int)
  year: number;
}
