import { CreateContestInput } from './create-contest.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContestInput extends PartialType(CreateContestInput) {}
