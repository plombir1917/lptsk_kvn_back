import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubscriberInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
