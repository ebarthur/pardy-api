import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { SecurityConfig } from 'src/utils/configs/config.interface'
import { JwtPayload } from '../dto/jwt-payload'
import { AuthUser } from '../dto/auth-user'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<SecurityConfig>('jwt_secret'),
    })
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
