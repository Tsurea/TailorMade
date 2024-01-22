/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   auth.service.ts                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: cmariot <cmariot@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/10/12 17:00:43 by cmariot           #+#    #+#             */
/*   Updated: 2023/10/15 18:25:13 by cmariot          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/signin.dto';
import { RefreshTokenIdsStorage } from './refresh_token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}

  // signIn() method is used to sign in a user. It takes a SignInDto object as
  // an argument and returns an access token if the user is successfully
  // authenticated.
  async signIn(signInDto: SignInDto) {
    // Extract username and password from the SignInDto object.
    const { username, password } = signInDto;

    if (!username || !password) {
      throw new UnauthorizedException('Missing data');
    }

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // Generate the access and refresh tokens.
    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '14d',
    });

    // Store the refresh token in redis
    await this.refreshTokenIdsStorage.insert(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // validateUser() method is used by the LocalStrategy to validate the
  // provided username and password. If the user is not found or the password
  // is not valid, an UnauthorizedException is thrown.
  // The validateUser method retrieves the user by username using the
  // UsersService and checks if the provided password is valid using the
  // validatePassword method from the User entity.
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await user.validatePassword(password))) {
      // Create a new object without the password field.
      const { password, ...result } = user;
      return result;
    }
    // If the user is not found or the password is not valid, return null.
    // The LocalStrategy will throw an UnauthorizedException.
    return null;
  }

  // refreshAccessToken method: is a method in AuthService which is used to
  // create a new access token given a valid refresh token.
  // When called, it verifies the provided refresh token, validates it using
  // RefreshTokenIdsStorage, and if it's valid, a new access token is created
  // and returned.
  // If the refresh token is not valid, an UnauthorizedException is thrown.
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const decoded = await this.jwtService.verifyAsync(refreshToken);
      await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
      const payload = { sub: decoded.sub, username: decoded.username };
      const accessToken = await this.jwtService.signAsync(payload);
      refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '14d',
      });

      // Store the refresh token in redis
      await this.refreshTokenIdsStorage.insert(decoded.id, refreshToken);

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async invalidateToken(accessToken: string): Promise<void> {
    try {
      const decoded = await this.jwtService.verifyAsync(accessToken);
      await this.refreshTokenIdsStorage.invalidate(decoded.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
