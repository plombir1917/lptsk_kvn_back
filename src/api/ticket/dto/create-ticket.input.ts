import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateTicketInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  link: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  event_id: number;
}
