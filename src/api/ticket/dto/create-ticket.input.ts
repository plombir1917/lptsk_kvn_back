import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field(() => String)
  link: string;

  @Field(() => Int)
  event_id: number;
}
