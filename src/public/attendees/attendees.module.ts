import { Module } from '@nestjs/common'
import { AttendeesService } from './attendees.service'
import { AttendeesController } from './attendees.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [AttendeesController],
  providers: [AttendeesService],
  imports: [PrismaModule],
})
export class AttendeesModule {}
