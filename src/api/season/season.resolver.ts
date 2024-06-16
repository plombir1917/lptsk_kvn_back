import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SeasonService } from './season.service';
import { Season } from './entities/season.entity';
import { CreateSeasonInput } from './dto/create-season.input';
import { UpdateSeasonInput } from './dto/update-season.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver(() => Season)
export class SeasonResolver {
  constructor(private readonly seasonService: SeasonService) {}

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Season)
  async createSeason(@Args('input') createSeasonInput: CreateSeasonInput) {
    try {
      return await this.seasonService.create(createSeasonInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Query(() => [Season])
  async getSeasons() {
    try {
      return await this.seasonService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Season)
  async updateSeason(
    @Args('id') id: string,
    @Args('input') updateSeasonInput: UpdateSeasonInput,
  ) {
    try {
      return await this.seasonService.update(+id, updateSeasonInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => Season)
  deleteSeason(@Args('id') id: number) {
    try {
      return this.seasonService.remove(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
