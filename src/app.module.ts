import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './public/users/users.module'
import { AuthModule } from './auth/auth.module'
import { MailSenderModule } from './mail-sender/mail-sender.module'
import { AttendeesModule } from './public/attendees/attendees.module'
import { EventsModule } from './public/events/events.module'
import { RsvpsModule } from './public/rsvps/rsvps.module'
import config from './utils/configs/config'
import { ThrottlerModule } from '@nestjs/throttler'

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule,
    UsersModule,
    AuthModule,
    MailSenderModule,
    AttendeesModule,
    EventsModule,
    RsvpsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
