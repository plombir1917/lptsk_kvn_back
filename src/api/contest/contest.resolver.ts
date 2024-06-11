import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContestService } from './contest.service';
import { Contest } from './entities/contest.entity';
import { CreateContestInput } from './dto/create-contest.input';
import { UpdateContestInput } from './dto/update-contest.input';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Contest)
export class ContestResolver {
  constructor(private readonly contestService: ContestService) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  createContest(@Args('input') createContestInput: CreateContestInput) {
    return this.contestService.create(createContestInput);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => [Contest])
  getContests() {
    return this.contestService.findAll();
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => Contest)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contestService.findOne(id);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  updateContest(
    @Args('id') id: number,
    @Args('input') updateContestInput: UpdateContestInput,
  ) {
    return this.contestService.update(id, updateContestInput);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  deleteContest(@Args('id') id: string) {
    return this.contestService.remove(+id);
  }
}
