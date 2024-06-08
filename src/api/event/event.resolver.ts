import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';
import { CreateEventInput } from './dto/create-event.input';
import { UpdateEventInput } from './dto/update-event.input';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Event)
export class EventResolver {
  constructor(private readonly eventService: EventService) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Event)
  createEvent(@Args('input') createEventInput: CreateEventInput) {
    return this.eventService.create(createEventInput);
  }

  @Query(() => [Event])
  getEvents() {
    return this.eventService.findAll();
  }

  @Query(() => Event)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.eventService.findOne(id);
  }

  @Mutation(() => Event)
  updateEvent(
    @Args('id') id: string,
    @Args('input') updateEventInput: UpdateEventInput,
  ) {
    return this.eventService.update(+id, updateEventInput);
  }

  @Mutation(() => Event)
  deleteEvent(@Args('id') id: string) {
    return this.eventService.delete(+id);
  }
}
