import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Team } from 'src/api/team/entities/team.entity';
import { Event } from './event.entity';

@ObjectType()
export class Activity {
  @Field(() => Int)
  team_id: number;

  @Field(() => Int)
  event_id: number;

  @Field(() => Team)
  team: Team;

  @Field(() => Event)
  event: Event;

  @Field(() => Int)
  team_rate: number;
}
