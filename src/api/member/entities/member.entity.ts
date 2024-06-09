import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Member {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  phonr: string;

  @Field(() => String)
  photo: string;

  @Field(() => Int)
  team_id: number;
}
