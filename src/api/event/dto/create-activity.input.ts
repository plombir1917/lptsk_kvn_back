import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateActivityInput {
  @Field(() => Int)
  team_id: number;

  @Field(() => Int)
  event_id: number;

  @Field(() => Int)
  team_rate: number;
}
