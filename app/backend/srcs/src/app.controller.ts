import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { Public } from './auth/decorator/public.decorator';
import { AdminGuard } from './auth/guard/admin-auth.guard copy';

@Controller('')
export class AppController {
  // Test route to check the user authentication.

  // Public route.
  @Public()
  @Get('public')
  async public() {
    return 'OK';
  }

  // Private route.
  @UseGuards(JwtAuthGuard) // This guard is used to check if the access token is valid.
  @Get('logged')
  async private(@Req() req: any) {
    console.log(req['user']);
    return 'OK';
  }

  // Admin route.
  @UseGuards(AdminGuard)
  @Get('admin')
  async admin(@Req() req: any) {
    console.log(req['user']);
    return 'OK';
  }
}
