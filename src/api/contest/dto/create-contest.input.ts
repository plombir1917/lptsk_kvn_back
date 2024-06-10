import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContestInput {
  @Field(() => String)
  name: string;

  @Field(() => Date)
  duration: Date;

  @Field(() => String)
  description: string;
}
