import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsInput {
  @Field()
  title: string;

  @Field()
  link: string;

  @Field()
  photo: string;

  @Field()
  season_id: number;
}
