import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => News)
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => News)
  createNews(@Args('input') createNewsInput: CreateNewsInput) {
    return this.newsService.create(createNewsInput);
  }

  @Query(() => [News])
  getNews() {
    return this.newsService.findAll();
  }

  @Query(() => News)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.findOne(id);
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => News)
  updateNews(@Args('input') updateNewsInput: UpdateNewsInput) {
    return this.newsService.update(updateNewsInput.id, updateNewsInput);
  }

  @Roles('ADMIN', 'DIRECTOR')
  @Mutation(() => News)
  removeNews(@Args('id', { type: () => Int }) id: number) {
    return this.newsService.remove(id);
  }
}
