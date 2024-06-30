import { CreateTicketInput } from './create-ticket.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {}
