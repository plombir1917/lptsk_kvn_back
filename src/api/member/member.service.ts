import { Injectable } from '@nestjs/common';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';

@Injectable()
export class MemberService {
  create(createMemberInput: CreateMemberInput) {
    return 'This action adds a new member';
  }

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: string) {
    return `This action returns a #${id} member`;
  }

  update(id: string, updateMemberInput: UpdateMemberInput) {
    return `This action updates a #${id} member`;
  }

  remove(id: string) {
    return `This action removes a #${id} member`;
  }
}
