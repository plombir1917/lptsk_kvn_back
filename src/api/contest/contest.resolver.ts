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
  createContest(
    @Args('createContestInput') createContestInput: CreateContestInput,
  ) {
    return this.contestService.create(createContestInput);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => [Contest], { name: 'contest' })
  findAll() {
    return this.contestService.findAll();
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Query(() => Contest, { name: 'contest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contestService.findOne(id);
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  updateContest(
    @Args('updateContestInput') updateContestInput: UpdateContestInput,
  ) {
    return this.contestService.update(
      updateContestInput.id,
      updateContestInput,
    );
  }

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Contest)
  removeContest(@Args('id', { type: () => Int }) id: number) {
    return this.contestService.remove(id);
  }
}
