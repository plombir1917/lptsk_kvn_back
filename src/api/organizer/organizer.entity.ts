import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Account } from '../account/account.entity';
import { Event } from '../event/entities/event.entity';

@ObjectType()
export class Organizer {
  @Field(() => String)
  account_id: string;

  @Field(() => Int)
  event_id: number;

  @Field(() => Account)
  account: Account;

  @Field(() => Event)
  event: Event;
}
