import {
  Resolver,
  Query,
  Mutation,
  Args,
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
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver(() => Member)
export class MemberResolver {
  constructor(
    private readonly memberService: MemberService,
    private readonly teamService: TeamService,
  ) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  async createMember(@Args('input') createMemberInput: CreateMemberInput) {
    try {
      return await this.memberService.create(createMemberInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => [Member])
  async getMembers() {
    try {
      return await this.memberService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  async updateMember(
    @Args('id') id: string,
    @Args('input') updateMemberInput: UpdateMemberInput,
  ) {
    try {
      return await this.memberService.update(id, updateMemberInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Member)
  async deleteMember(@Args('id') id: string) {
    try {
      return await this.memberService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ResolveField(() => Team)
  async team(@Parent() member: Member) {
    try {
      return await this.teamService.findOne(+member.team_id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
