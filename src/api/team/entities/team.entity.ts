import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Team {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  achievments: string;

  @Field(() => String)
  home: string;

  @Field(() => Int)
  rate: number;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String)
  photo: string;
}
