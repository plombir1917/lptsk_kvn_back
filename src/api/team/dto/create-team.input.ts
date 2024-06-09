import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
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
