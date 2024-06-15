import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubscriberService } from './subscriber.service';
import { Subscriber } from './entities/subscriber.entity';
import { CreateSubscriberInput } from './dto/create-subscriber.input';
import { UpdateSubscriberInput } from './dto/update-subscriber.input';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Subscriber)
export class SubscriberResolver {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Mutation(() => Subscriber)
  async createSubscriber(
    @Args('input') createSubscriberInput: CreateSubscriberInput,
  ) {
    try {
      return await this.subscriberService.create(createSubscriberInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Query(() => [Subscriber], { name: 'subscriber' })
  async findAll() {
    try {
      return await this.subscriberService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Subscriber)
  async updateSubscriber(
    @Args('id') id: string,
    @Args('input') updateSubscriberInput: UpdateSubscriberInput,
  ) {
    try {
      return await this.subscriberService.update(id, updateSubscriberInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Subscriber)
  async removeSubscriber(@Args('id') id: string) {
    try {
      return await this.subscriberService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
