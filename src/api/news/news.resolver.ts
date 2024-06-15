import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { Roles } from '../auth/decorators/roles.decorator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => News)
  async createNews(@Args('input') createNewsInput: CreateNewsInput) {
    try {
      return await this.newsService.create(createNewsInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Query(() => [News])
  async getNews() {
    try {
      return await this.newsService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => News)
  async updateNews(
    @Args('id') id: string,
    @Args('input') updateNewsInput: UpdateNewsInput,
  ) {
    try {
      return await this.newsService.update(+id, updateNewsInput);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => News)
  async deleteNews(@Args('id') id: string) {
    try {
      return await this.newsService.remove(+id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
