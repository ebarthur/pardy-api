import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { UsersModule } from 'src/public/users/users.module'
import { AuthController } from './auth.controller'
import { JwtStrategy } from './strategies/jwt.strategy'
import { MailSenderModule } from '../mail-sender/mail-sender.module'
import { PrismaService } from 'src/prisma/prisma.service'
import Config from 'src/utils/configs/config'

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: Config().security.jwt_secret,
      signOptions: {
        expiresIn: Config().security.expiresIn,
      },
    }),
    MailSenderModule,
  ],
  providers: [AuthService, JwtStrategy, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
