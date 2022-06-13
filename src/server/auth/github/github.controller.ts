import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { JwtAuthService } from '../jwt/jwt.service';
import { GithubOauthGuard } from './github.guard';

@Controller('auth/github')
export class GithubController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async googleAuth(@Req() _req: Request) {
    // Guard redirects
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { accessToken } = this.jwtAuthService.login(req.user as User);
    // todo: for now cookies will do
    // there should be a separate endpoint for stateless JWT auth approach
    res.cookie('session', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.redirect('/bots');
  }
}
