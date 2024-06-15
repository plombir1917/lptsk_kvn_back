import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateContestInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;
}
