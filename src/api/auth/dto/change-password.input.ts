import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChangePasswordInput {
  @Field()
  login: string;

  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}
