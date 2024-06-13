import { Injectable } from '@nestjs/common';
import { CreateSubscriberInput } from './dto/create-subscriber.input';
import { UpdateSubscriberInput } from './dto/update-subscriber.input';

@Injectable()
export class SubscriberService {
  create(createSubscriberInput: CreateSubscriberInput) {
    return 'This action adds a new subscriber';
  }

  findAll() {
    return `This action returns all subscriber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriber`;
  }

  update(id: number, updateSubscriberInput: UpdateSubscriberInput) {
    return `This action updates a #${id} subscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriber`;
  }
}
