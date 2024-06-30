import { CreateSubscriberInput } from './create-subscriber.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubscriberInput extends PartialType(CreateSubscriberInput) {}
