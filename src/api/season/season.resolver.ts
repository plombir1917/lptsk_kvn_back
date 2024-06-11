import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeasonService } from './season.service';
import { Season } from './entities/season.entity';
import { CreateSeasonInput } from './dto/create-season.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Roles('EDITOR', 'DIRECTOR')
  @Mutation(() => Season)
  createSeason(@Args('input') createSeasonInput: CreateSeasonInput) {
    return this.seasonService.create(createSeasonInput);
  }

  @Query(() => [Season])
  getSeasons() {
    return this.seasonService.findAll();
  }

  @Query(() => Season)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.seasonService.findOne(id);
  }

  @Mutation(() => Season)
  updateSeason(
    @Args('id') id: string,
    @Args('input') updateSeasonInput: UpdateSeasonInput,
  ) {
    return this.seasonService.update(+id, updateSeasonInput);
  }

  @Mutation(() => Season)
  deleteSeason(@Args('id', { type: () => Int }) id: number) {
    return this.seasonService.remove(id);
  }
}
