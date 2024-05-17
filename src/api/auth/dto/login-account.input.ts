import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginAccountInput {
  @Field()
  login: string;

  @Field()
  password: string;
}
