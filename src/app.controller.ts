/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AuthGuard } from '@nestjs/passport';
import { UseGuards, Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  user?: any;
}

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Redirects to Google OAuth login
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: AuthenticatedRequest) {
    return {
      message: 'Google Auth Successful!',
      user: req.user,
    };
  }
}
