import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class News {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  link: string;

  @Field(() => String)
  photo: string;

  @Field(() => Int)
  season_id: number;
}
