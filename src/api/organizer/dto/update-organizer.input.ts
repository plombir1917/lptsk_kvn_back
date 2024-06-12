import { InputType, PartialType } from '@nestjs/graphql';
import { CreateOrganizerInput } from './create-organizer.input';

@InputType()
export class UpdateOrganizerInput extends PartialType(CreateOrganizerInput) {}
