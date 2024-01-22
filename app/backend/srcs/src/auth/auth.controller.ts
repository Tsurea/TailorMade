/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.controller.ts                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/11 17:14:52 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 18:22:16 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Body, Headers, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from '../users/dto/registerUserDto';
import { Public } from './decorator/public.decorator';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenDto } from './dto/refreshtoken.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtRefreshTokenGuard } from './guard/jwt-refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // POST /api/auth/register
  // This route is used to register a new user.
  @Public() // This decorator is used to allow access to this route to everyone.
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.usersService.create(registerUserDto);
    return this.authService.signIn(registerUserDto);
  }

  // POST /api/auth/login
  // This route is used to log in a user.
  // The user will receive an access token.
  @Public() // This decorator is used to allow access to this route to everyone.
  @UseGuards(LocalAuthGuard) // This guard is used to check if the username and password are valid.
  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  // POST /api/auth/refresh
  // This route is used to refresh the access token.
  // The user will receive a new access token.
  @UseGuards(JwtRefreshTokenGuard) // This guard is used to check if the refresh token is valid.
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  }

  @UseGuards(JwtAuthGuard) // This guard is used to check if the access token is valid.
  @Post('logout')
  async invalidateToken(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    await this.authService.invalidateToken(token);
    return { message: 'Token invalidated successfully' };
  }
}
