import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  date: string;

  @Field(() => String)
  place: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  photo: string;

  @Field(() => String)
  link: string;
}
