import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class CreateActivityInput {
  @Field(() => Int)
  @IsNumber()
  team_id: number;

  @Field(() => Int)
  @IsNumber()
  event_id: number;

  @Field(() => Int)
  @IsNumber()
  team_rate: number;
}
