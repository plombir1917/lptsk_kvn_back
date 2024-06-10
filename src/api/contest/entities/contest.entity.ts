import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Contest {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  duration: Date;

  @Field(() => String)
  description: string;
}
