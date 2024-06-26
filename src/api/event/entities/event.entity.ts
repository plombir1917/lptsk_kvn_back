import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Event {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  place: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  photo: string;

  @Field(() => String)
  link: string;

  @Field(() => Date)
  created_at: Date;
}
