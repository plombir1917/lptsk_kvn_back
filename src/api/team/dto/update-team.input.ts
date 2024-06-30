import { CreateTeamInput } from './create-team.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTeamInput extends PartialType(CreateTeamInput) {}
