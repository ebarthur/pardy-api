import { ApiProperty } from '@nestjs/swagger'
import {
  IsNumber,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
} from 'class-validator'
import { Dto } from 'src/utils/dto/Dto'

export class CreateEventDto extends Dto<CreateEventDto> {
  @ApiProperty({ description: 'Name of the event' })
  @IsString()
  name: string

  @ApiProperty({ description: 'Start date and time of the event' })
  @IsDate()
  startOn: Date

  @ApiProperty({ description: 'Street address of the event', required: false })
  @IsOptional()
  @IsString()
  street?: string

  @ApiProperty({
    description: 'Zip code of the event location',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  zip?: number

  @ApiProperty({
    description: 'Building information of the event location',
    required: false,
  })
  @IsOptional()
  @IsString()
  bldg?: string

  @ApiProperty({
    description: 'Indicates if the event is private or not',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean = false

  @ApiProperty({ description: 'Status of the event', default: 'draft' })
  @IsOptional()
  @IsString()
  status?: 'draft' | 'live' | 'started' | 'ended' | 'canceled' = 'draft'
}
