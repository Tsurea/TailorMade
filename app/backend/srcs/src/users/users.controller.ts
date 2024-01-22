import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard) // This guard is used to check if the access token is valid.
  @Get()
  async getUser(@Req() req: any) {
    return this.usersService.getById(req['user'].id);
  }
}
