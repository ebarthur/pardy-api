import { Module } from '@nestjs/common'
import { RsvpsService } from './rsvps.service'
import { RsvpsController } from './rsvps.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [RsvpsController],
  providers: [RsvpsService],
  imports: [PrismaModule],
})
export class RsvpsModule {}
