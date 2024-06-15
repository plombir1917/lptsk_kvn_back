import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateAccountEventInput {
  @Field(() => String)
  @IsString()
  account_id: string;

  @Field(() => Int)
  @IsNumber()
  event_id: number;
}
