import { CreateSubscriberInput } from './create-subscriber.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubscriberInput extends PartialType(CreateSubscriberInput) {
  @Field(() => Int)
  id: number;
}
