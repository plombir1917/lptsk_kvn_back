import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MemberService } from './member.service';
import { Member } from './entities/member.entity';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { TeamService } from '../team/team.service';
import { Team } from '../team/entities/team.entity';

@Resolver(() => Member)
export class MemberResolver {
  constructor(
    private readonly memberService: MemberService,
    private readonly teamService: TeamService,
  ) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  createMember(@Args('input') createMemberInput: CreateMemberInput) {
    return this.memberService.create(createMemberInput);
  }
  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => [Member])
  getMembers() {
    return this.memberService.findAll();
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => Member)
  findOne(@Args('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  updateMember(
    @Args('id') id: string,
    @Args('input') updateMemberInput: UpdateMemberInput,
  ) {
    return this.memberService.update(id, updateMemberInput);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  deleteMember(@Args('id') id: string) {
    return this.memberService.remove(id);
  }

  @ResolveField(() => Team)
  team(@Parent() member: Member) {
    return this.teamService.findOne(+member.team_id);
  }
}
