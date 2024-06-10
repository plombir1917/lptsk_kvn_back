import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Member)
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ) {
    return this.memberService.create(createMemberInput);
  }
  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => [Member], { name: 'member' })
  findAll() {
    return this.memberService.findAll();
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => Member, { name: 'member' })
  findOne(@Args('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  updateMember(
    @Args('id') id: string,
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ) {
    return this.memberService.update(id, updateMemberInput);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  removeMember(@Args('id') id: string) {
    return this.memberService.remove(id);
  }
}
