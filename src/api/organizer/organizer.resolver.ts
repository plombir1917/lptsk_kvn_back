import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Organizer } from './organizer.entity';
import { CreateOrganizerInput } from './dto/create-organizer.input';
import { OrganizerService } from './organizer.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateOrganizerInput } from './dto/update-organizer.input';
@Resolver('Organizer')
export class OrganizerResolver {
  constructor(private readonly organizerService: OrganizerService) {}

  @Roles('DIRECTOR')
  @Mutation(() => Organizer)
  async createOrganizer(@Args('input') input: CreateOrganizerInput) {
    try {
      return await this.organizerService.createOrganizer(input);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Roles('DIRECTOR')
  @Query(() => [Organizer])
  async getEventsByOrganizerId(@Args('id') id: string) {
    try {
      return await this.organizerService.getEventsByOrganizerId(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Query(() => String)
  async donwloadExcel() {
    return await this.organizerService.downloadExcel();
  }

  @Roles('DIRECTOR')
  @Query(() => [Organizer])
  async getOrganizers() {
    try {
      return await this.organizerService.getOrganizers();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR')
  @Mutation(() => Organizer)
  async updateOrganizer(@Args('input') input: UpdateOrganizerInput) {
    try {
      return await this.organizerService.updateOrganizer(input);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Roles('DIRECTOR')
  @Mutation(() => Organizer)
  async deleteOrganizer(
    @Args('input') createOrganizerInput: CreateOrganizerInput,
  ) {
    return await this.organizerService.deleteOrganizer(createOrganizerInput);
  }
}
