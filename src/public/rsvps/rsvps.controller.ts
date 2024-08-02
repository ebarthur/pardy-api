import { Controller } from '@nestjs/common';
import { RsvpsService } from './rsvps.service';

@Controller('rsvps')
export class RsvpsController {
  constructor(private readonly rsvpsService: RsvpsService) {}
}
