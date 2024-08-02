import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ReqUser } from './util/user.decorator';
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  CheckEmailRequest,
  CheckEmailResponse,
  CheckUsernameRequest,
  CheckUsernameResponse,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  SignupRequest,
} from './dto'
import { AuthUser } from './dto/auth-user'
import { UserResponse } from 'src/public/users/dto/user-response';
import { JwtGuard } from './guards/jwt.guard';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('check-username')
  @HttpCode(HttpStatus.OK)
  async checkUsernameAvailability(
    @Body() checkUsernameRequest: CheckUsernameRequest,
  ): Promise<CheckUsernameResponse> {
    const isAvailable = await this.authService.isUsernameAvailable(
      checkUsernameRequest.username,
    );
    return new CheckUsernameResponse(isAvailable);
  }

  @Post('check-email')
  @HttpCode(HttpStatus.OK)
  async checkEmailAvailability(
    @Body() checkEmailRequest: CheckEmailRequest,
  ): Promise<CheckEmailResponse> {
    const isAvailable = await this.authService.isEmailAvailable(
      checkEmailRequest.email,
    );
    return new CheckEmailResponse(isAvailable);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupRequest: SignupRequest): Promise<void> {
    await this.authService.signup(signupRequest);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.login(loginRequest));
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async getUserWithToken(@ReqUser() user: AuthUser): Promise<UserResponse> {
    return UserResponse.fromUserEntity(user);
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyMail(@Query('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }

  @ApiBearerAuth()
  @Post('change-email')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async sendChangeEmailMail(
    @ReqUser() user: AuthUser,
    @Body() changeEmailRequest: ChangeEmailRequest,
  ): Promise<void> {
    await this.authService.sendChangeEmailMail(
      changeEmailRequest,
      user.id,
      user.firstName,
      user.email,
    );
  }

  @Get('change-email')
  @HttpCode(HttpStatus.OK)
  async changeEmail(@Query('token') token: string): Promise<void> {
    await this.authService.changeEmail(token);
  }

  @Post('forgot-password/:email')
  @HttpCode(HttpStatus.OK)
  async sendResetPassword(@Param('email') email: string): Promise<void> {
    await this.authService.sendResetPasswordMail(email);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
    @ReqUser() user: AuthUser,
  ): Promise<void> {
    await this.authService.changePassword(
      changePasswordRequest,
      user.id,
      user.firstName,
      user.email,
    );
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordRequest);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  async resendVerificationMail(@ReqUser() user: AuthUser): Promise<void> {
    await this.authService.resendVerificationMail(
      user.firstName,
      user.email,
      user.id,
    );
  }
}
