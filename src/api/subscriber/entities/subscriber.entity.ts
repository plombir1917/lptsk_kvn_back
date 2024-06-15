import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Subscriber {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;
}
