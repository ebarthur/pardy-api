import {
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateEventDto } from './dto/create-event.dto'

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async CreateEvent(userId: number, e: CreateEventDto) {
    const { name, startOn } = e

    if (!userId) {
      throw new NotFoundException('User not found')
    }

    if (!name || !startOn) {
      throw new PreconditionFailedException('Name and start date are required')
    }

    const event = await this.prisma.event.create({
      data: {
        name: e.name,
        startOn: e.startOn,
        createdById: userId,
        street: e.street,
        zip: e.zip,
        bldg: e.bldg,
        isPrivate: e.isPrivate,
        status: e.status,
      },
    })
    return new CreateEventDto(event)
  }

  async GetAllEvents() {
    return await this.prisma.event.findMany()
  }

  async GetEventByUserId(userId: number) {
    if (!userId) {
      throw new NotFoundException('User not found')
    }
    return await this.prisma.event.findMany({
      where: {
        createdById: userId,
      },
    })
  }
}
