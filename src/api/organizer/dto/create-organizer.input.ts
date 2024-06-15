import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateOrganizerInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  account_id: string;

  @Field()
  @IsNumber()
  @IsNotEmpty()
  event_id: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  responsibility?: string;
}
