import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { EventsService } from './events.service'
import { ApiTags } from '@nestjs/swagger'
import { ReqUser } from 'src/auth/util/user.decorator'
import { AuthUser } from 'src/auth/dto/auth-user'
import { CreateEventDto } from './dto/create-event.dto'
import { JwtGuard } from 'src/auth/guards/jwt.guard'

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async createEvent(@ReqUser() user: AuthUser, @Body() e: CreateEventDto): Promise<CreateEventDto> {
    return this.eventsService.CreateEvent(user.id, e)
  }

  @Post('all')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async GetAllEvents() {
    return this.eventsService.GetAllEvents()
  }

  @Post('event')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  async GetEventById(@Body() {id}: {id: number}) {
    return this.eventsService.GetEventByUserId(id)
  }
}
