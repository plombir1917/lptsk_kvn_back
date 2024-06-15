import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContestService } from './contest.service';
import { Contest } from './entities/contest.entity';
import { CreateContestInput } from './dto/create-contest.input';
import { UpdateContestInput } from './dto/update-contest.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  async createContest(@Args('input') createContestInput: CreateContestInput) {
    try {
      return await this.contestService.create(createContestInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => [Contest])
  async getContests() {
    try {
      return await this.contestService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  async updateContest(
    @Args('id') id: number,
    @Args('input') updateContestInput: UpdateContestInput,
  ) {
    try {
      return await this.contestService.update(id, updateContestInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  async deleteContest(@Args('id') id: string) {
    try {
      return await this.contestService.remove(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
