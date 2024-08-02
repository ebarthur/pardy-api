import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common'
import { Request } from 'express'

export const ReqUser = (required = true) =>
  createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()
    const user = request.user

    if (!user && required) {
      throw new BadRequestException('User was not found')
    }

    return user
  })()
