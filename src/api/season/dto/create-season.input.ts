import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateSeasonInput {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  year: number;
}
