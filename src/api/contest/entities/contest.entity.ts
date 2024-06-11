import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Contest {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  duration: number;

  @Field(() => String)
  description: string;
}
