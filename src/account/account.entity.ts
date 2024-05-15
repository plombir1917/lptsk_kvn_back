import { Field, ObjectType } from '@nestjs/graphql';
import { $Enums } from '@prisma/client';

@ObjectType()
export class AccountEntity {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  surname: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String)
  login: string;

  @Field(() => String)
  password: string;

  @Field(() => $Enums.roles)
  role: $Enums.roles;
}
