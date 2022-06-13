import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { NextService } from './next.service';

@Controller('/')
export class NextController {
  constructor(private readonly nextService: NextService) {}

  // todo: separate into _next*, favicon.ico, page routes
  // this should work for fast prototyping
  @UseGuards(JwtAuthGuard)
  @Get('*')
  render(@Req() request: Request, @Res() response: Response) {
    const handler = this.nextService.getRequestHandler();
    return handler(request, response);
  }
}
