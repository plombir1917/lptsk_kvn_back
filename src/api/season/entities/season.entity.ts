import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Season {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  year: number;
}
