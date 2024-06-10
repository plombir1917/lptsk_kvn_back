import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateAccountEventInput {
  @Field(() => String)
  account_id: string;

  @Field(() => Int)
  event_id: number;
}
