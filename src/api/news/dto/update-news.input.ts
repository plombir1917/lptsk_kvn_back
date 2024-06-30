import { CreateNewsInput } from './create-news.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNewsInput extends PartialType(CreateNewsInput) {}
