import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { SeasonModule } from './season/season.module';
import { NewsModule } from './news/news.module';
import { EventModule } from './event/event.module';
import { ContestModule } from './contest/contest.module';
import { TeamModule } from './team/team.module';
import { MemberModule } from './member/member.module';
import { TicketModule } from './ticket/ticket.module';
import { OrganizerModule } from './organizer/organizer.module';

@Module({
  imports: [
    AccountModule,
    AuthModule,
    SeasonModule,
    NewsModule,
    EventModule,
    ContestModule,
    TeamModule,
    MemberModule,
    TicketModule,
    OrganizerModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiModule {}
