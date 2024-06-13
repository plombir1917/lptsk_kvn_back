import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Subscriber {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
