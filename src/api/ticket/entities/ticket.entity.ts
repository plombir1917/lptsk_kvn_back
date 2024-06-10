import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Ticket {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  link: string;

  @Field(() => Int)
  event_id: number;
}
