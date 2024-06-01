import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Season {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
