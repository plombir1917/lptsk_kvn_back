import { InputType, Int, Field } from '@nestjs/graphql';
import { Member } from '../entities/member.entity';

@InputType()
export class CreateMemberInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  photo: string;

  @Field(() => Int)
  team_id: number;
}
