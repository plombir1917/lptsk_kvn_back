import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateContestInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  duration: number;

  @Field(() => String)
  description: string;
}
